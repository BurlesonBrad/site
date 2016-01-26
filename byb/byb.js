(function($) {
$(document).ready(function() {

//Cookies.remove('byb', {domain: '.hyzershop.com'});
//console.log( Cookies.get('byb') );

$("#clear-bags").click(function() {
	deleteBags();
	Cookies.remove('byb', {domain: '.hyzershop.com'});
	location.reload();
});

function updateBags(data) {
	// $.post("/build-your-bag", {
	// 	bags: data
	// });
}

function deleteBags() {
	// $.post("/build-your-bag", {
	// 	bags: ''
	// });
}

function get_bags() {
	return $.getJSON("/location", {
		byb: 'true'
	});
}
var promise_bags = get_bags();

function editBagName( bag, name ) {
	var the_bags = false;
	var user_meta = false;
	promise_bags.success(function(data) {
		the_bags = data;
		user_meta = true;

		editName( the_bags, bag, name );
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
		console.log('The server is not responding');

		if (textStatus == 'error')
		console.log(errorThrown);
	
		if ( Cookies.get('byb') && Cookies.get('byb') != 'undefined' ) {
			the_bags = Cookies.getJSON('byb');
			editName( the_bags, bag, name );
		}
	});

	function editName( the_bags, bag, name ) {
		var this_bag = the_bags[0];
		var bagIndex = 0;
		for ( i = 0; i < the_bags.length; i++ ) {
			if (the_bags[i]["name"] === bag ) {
				this_bag = the_bags[i];
				bagIndex = i;
			}
		}
		this_bag["name"] = name;
		var bags_json = JSON.stringify(the_bags);
		updateBags(bags_json);
		Cookies.set('byb', bags_json, { expires: 1000, path: "/", domain: ".hyzershop.com" });
	}
}

/***						***/
/***	BEGIN ADD TO BAG 	***/
/***						***/

// BAG STRUCTURE:
function addToBag(e, bag, disc, t) {
	var the_bags = false;
	promise_bags.success(function(data) {
		the_bags = data;
		addTheDisc( the_bags, e, bag, disc, t );
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
		console.log('The server is not responding');

		if (textStatus == 'error')
		console.log(errorThrown);
	
		if ( Cookies.get('byb') && Cookies.get('byb') != 'undefined' ) {
			the_bags = Cookies.getJSON('byb');
		} else {
			the_bags = [
				{
					"name": "My Bag",
					"discs": []
				}
			];
		}

		addTheDisc( the_bags, e, bag, disc, t );
	});

	function addTheDisc( the_bags, e, bag, disc, t ) {
		if ( disc.length === 0 || t.length === 0 ) {
			alert("Sorry, but there was a problem adding this disc to your bag.");
			return;
		}

	// find the right bag, otherwise use the first bag
		var this_bag = the_bags[0];
		var bagIndex = 0;
		for ( i = 0; i < the_bags.length; i++ ) {
			if (the_bags[i]["name"] === bag ) {
				this_bag = the_bags[i];
				bagIndex = i;
			}
		}

		console.log( this_bag );

	// find if this disc is already set - if so, return before newDisc object is created and the cookie is set
		for ( i = 0; i < this_bag.discs.length; i++ ) {
			if ( this_bag["discs"][i]["slug"] === disc ) {
				return; // PREVENTING DUPLICATES Part 1
			}
		}

	// DISC STRUCTURE:
		var newDisc = {};

		var disc_name = disc.replace(/\-/g, " ");
		var disc_type = t.toLowerCase().replace(/ /g, "-");

		newDisc["slug"] = disc;
		newDisc["name"] = disc_name;
		newDisc["type"] = disc_type;

		the_bags[bagIndex].discs.push(newDisc);

	// SET THE COOKIE
		var bags_json = JSON.stringify(the_bags);
		updateBags(bags_json);
		Cookies.set('byb', bags_json, { expires: 1000, path: "/", domain: ".hyzershop.com" });

	// ON SUCCESS:
		if ( $(".add-to-bag-success").length === 0 ) {
			var $success = $("<div class='add-to-bag-success'>Added to bag! <a href='/build-your-bag'>view your bag</a></div>");
			$success.appendTo("body").delay(5000).fadeOut(400, function() {
				$(this).remove();
			});
		}

		if ( $(e.target).hasClass("add-to-bag") ) {
			$(e.target).addClass("success");
		}
		if ( $(e.target).parents(".add-to-bag").length === 1 ) {
			$(e.target).parents(".add-to-bag").addClass("success");
		}

		if ( $("body.page-id-45").length > 0 ) {
			location.reload();
		}
	}
}

// INSERT THE ADD BUTTON INTERFACE
var $bagsMenu = $("<select class='bags-menu'></select>");

var the_bags = false;
var user_meta = false;
promise_bags.success(function(data) {
	the_bags = data;
	for (i = 0; i < the_bags.length; i++ ) {
		var bagSlug = the_bags[i]["name"];
		var bagName = bagSlug.replace(/\-/g, " ");
		$bagsMenu.append("<option value='" + bagName + "'>" + bagName + "</option>");
	}
}).error(function(jqXHR, textStatus, errorThrown) {
	if (textStatus == 'timeout')
	console.log('The server is not responding');

	if (textStatus == 'error')
	console.log(errorThrown);

	$bagsMenu.append("<option value='My Bag'>My Bag</option>");
});

var $addToBagBtn = $("<div class='add-to-bag'><img class='not-yet-added' src='/wp-content/themes/storefront-child/images/plus-pink.gif' width='12' height='12' alt='Add' /><img class='added' src='/wp-content/themes/storefront-child/images/check-green.gif' width='14' height='12' alt='Add' /><span>Add<span class='added'>ed</span> to bag<span class='added'>!</span></span></div>");

/***						***/
/***	REMOVE FROM BAG 	***/
/***						***/
function removeFromBag(e, bag, disc) {
	console.log("params: " + e + ", " + bag + ", " + disc);
	var the_bags = false;
	var user_meta = false;
	promise_bags.success(function(data) {
		the_bags = data;
		removeTheDisc(the_bags, e, bag, disc);
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
		console.log('The server is not responding');

		if (textStatus == 'error')
		console.log(errorThrown);

		if ( Cookies.get('byb') && Cookies.get('byb') != 'undefined' ) {
			the_bags = Cookies.getJSON('byb');
		}
		removeTheDisc(the_bags, e, bag, disc);
	});

	function removeTheDisc(the_bags, e, bag, disc) {
		var this_bag = the_bags[0];
		var bagIndex = 0;
		for ( i = 0; i < the_bags.length; i++ ) {
			if (the_bags[i]["name"] === bag ) {
				this_bag = the_bags[i];
				bagIndex = i;
			}
		}

		for ( i = 0; i < this_bag.discs.length; i++ ) {
			if ( this_bag["discs"][i]["slug"] === disc ) {
				the_bags[bagIndex]["discs"].splice(i, 1);
				//updateBags( JSON.stringify(the_bags) );
				Cookies.set("byb", the_bags, { expires: 1000, path: "/", domain: ".hyzershop.com" });
				
				if ( $("body.page-id-45").length > 0 ) {
					location.reload();
				}
			}
		}

	// ON SUCCESS:
		if ( $(".remove-from-bag-success").length === 0 ) {
			var $success = $("<div class='remove-from-bag-success'>Removed from bag. <a href='/build-your-bag'>view your bag</a></div>");
			$success.appendTo("body").delay(5000).fadeOut(400, function() {
				$(this).remove();
			});
		}

		if ( $(e.target).hasClass("remove-from-bag") ) {
			$(e.target).addClass("success");
		}
		if ( $(e.target).parents(".remove-from-bag").length === 1 ) {
			$(e.target).parents(".remove-from-bag").addClass("success");
		}
	}
}

var $removeFromBagBtn = $("<div class='remove-from-bag'><img class='not-yet-removed' src='/wp-content/themes/storefront-child/images/x-red.gif' width='12' height='12' alt='Remove' /><img class='removed' src='/wp-content/themes/storefront-child/images/check-green.gif' width='14' height='12' alt='Removed' /><span>Remove<span class='removed'>d</span> from bag</span></div>");

/***					***/
/***	ADD TO BAG 		***/
/***					***/
$addToBagBtn.click(function(e) {
	var slug = $(this).parents(".product[data-product-slug]").data("product-slug");
	var type = $(this).parents(".product[data-disc-type]").data("disc-type");

	$bagsMenu = $(this).parents(".product").find(".bags-menu");
	$bag = $bagsMenu.val();

	addToBag( e, $bag, slug, type );
});

$("form.checkout").submit(function(e) {
	var $cartItem = $(this).find("#payment").prev(".shop_table").find(".cart_item");
	$bag = $bagsMenu.find("option").first().attr("value");
	$cartItem.each(function() {
		var $this = $(this);
		slug = $this.data("product-slug");
		type = $this.data("disc-type");
		addToBag(e, $bag, slug, type );
	});
});

/***					***/
/***  REMOVE FROM BAG 	***/
/***					***/
$removeFromBagBtn.click(function(e) {
	var slug = $(this).parents("*[data-product-slug]").data("product-slug");
	var $bag = $(this).parents("div[data-bag-name]").data("bag-name") || false;

	removeFromBag( e, $bag, slug );
});

/**							 **/
/** PLACE ADD/REMOVE BUTTONS **/
/**	------------------------ **/

function bagButtons() {
	// Insert ADD-TO-BAG buttons
	var $singleProdBtns = $(".single-product main > div[data-product-slug].product-cat-discs > .summary").find(".add-to-bag, .remove-from-bag");
	var $archiveProdBtns = $("li.product-cat-discs[data-product-slug]").not(".page-id-45 .disc").find(".add-to-bag, .remove-from-bag");

	$(".single-product main > div[data-product-slug].product-cat-discs > .summary .cart").append( $singleProdBtns );

	$(".add-to-bag").click(function(e) {
		var slug = $(this).parents(".product[data-product-slug]").data("product-slug");
		var type = $(this).parents(".product[data-disc-type]").data("disc-type");

		$bagsMenu = $(this).parents(".product").find(".bags-menu");
		$bag = $bagsMenu.val();

		addToBag( e, $bag, slug, type );
	});

	$(".remove-from-bag").click(function(e) {
		var slug = $(this).parents("*[data-product-slug]").data("product-slug");
		var $bag = $(this).parents("div[data-bag-name]").data("bag-name") || false;

		removeFromBag( e, $bag, slug );
	});

	if ( $("body").hasClass("page-id-45") ) {
		$(".disc .remove-from-bag").click(function(e) {
			var slug = $(this).parents("*[data-product-slug]").data("product-slug");
			var $bag = $(this).parents("div[data-bag-name]").data("bag-name") || false;

			removeFromBag( e, $bag, slug );
		});
	}
}
bagButtons();
setInterval(bagButtons, 1200);


// Deactivate 'add to bag' buttons for already-added discs
function checkTheBags() {
	var the_bags = false;
	var user_meta = false;
	promise_bags.success(function(data) {
		the_bags = data;
		for (i = 0; i < the_bags.length; i++ ) {
			var bagSlug = the_bags[i]["name"];
			var bagName = bagSlug.replace(/\-/g, " ");
			$bagsMenu.append("<option value='" + bagName + "'>" + bagName + "</option>");
		}
	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus == 'timeout')
		//console.log('The server is not responding');

		if (textStatus == 'error')
		//console.log(errorThrown);

		if ( Cookies.get('byb') && Cookies.get('byb') != 'undefined' ) {
			the_bags = Cookies.getJSON('byb');
		}

		deactivateAddBtn( the_bags );
	});

	function deactivateAddBtn( the_bags ) {
		if ( the_bags ) {
			$(".add-to-bag").each(function() {
				var $this = $(this);
				var disc_slug = $this.parents("*[data-product-slug]").eq(0).data("product-slug");
				for (i = 0; i < the_bags.length; i++ ) {
					for (index = 0; index < the_bags[i]["discs"].length; index++ ) {
						this_slug = the_bags[i]["discs"][index]["slug"];
						if ( disc_slug === this_slug ) {
							//$this.addClass("success");
							$this.hide();
							$this.siblings(".remove-from-bag").css("display", "block");
						}
					}
				}
			});
		}
	}
}
checkTheBags();
setInterval(checkTheBags, 1400);




// $(".page-id-45 .disc[data-product-slug]").each(function() {
// 	$removeBtn.clone(true).appendTo($(this));
// });




// EDIT BAG
// $(".bag-edit-btn").each(function() {
// 	if ( $(this).siblings("form.edit-bag-name").length ) {
// 		$(this).addClass("bag-name-edit-btn");
// 	}
// });

(function() {
	var $this = $(this);
	var $bagNameForm = $("form.edit-bag-name");
	var $bagName = $bagNameForm.siblings("h2");
	var $bagNameInput = $bagNameForm.find("input[type='text']");

	// $this.hide();
	// $bagName.hide();
	// $bagNameForm.show();
	// $bagNameInput.focus();

	$bagNameInput.blur(function() {
		$bagNameForm.submit();
	});
	$bagNameForm.submit(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
//		var $editBagBtn = $this.siblings(".bag-edit-btn");
		var $bagNameInput = $this.find("input[type='text']");
		var $bagTitle = $this.siblings("h2");
		var bagName = $bagTitle.text();
		var newName = $bagNameInput.val();

//		$editBagBtn.show();

		if ( $bagNameInput.is(":focus") ) {
			$bagNameInput.blur();
		}

		editBagName( bagName, newName );
	});
})();


$(".disc").hover(function() {
	if ( $(this).next(".disc").length ) {
		$(this).next(".disc").toggleClass("get-out-the-way");
	}
});


// OPTIONS MENU
$(".page-id-45 .options-btn").click(function() {
	$(this).parent().toggleClass("expanded");
});
$(document).click(function(e) {
	if ( !$(e.target).parents(".options").length ) {
		$(".page-id-45 .options").removeClass("expanded");
	}
});
$(".edit-name-btn").click(function() {
	$(".edit-bag-name input[type='text']").focus();
});






// var wp_user = bybWrapper.attr("data-user"),
//	bybWrapper = $("#byb-wrapper"),
// 	user = ( wp_user != "0" ? wp_user : makeid() ),
// 	logged_in = ( wp_user != "0" ? true : false );

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     for( var i=0; i < 5; i++ )
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return text;
// }


// function initBag(u,l) {
// // get user data (not using that in this version)
// 	console.log("user? " + u + " | logged in? " + l);
	
// // get the bag
// 	var byb_data = Cookies.getJSON('byb'),
// 		$bag_name = byb_data.bag.name,
// 		$disc_1_name = byb_data.bag.discs[1].name;
// 	console.log($bag_name + " | " + $disc_1_name);
	
// 	// use a for loop to display all that data!
// }

});
})(jQuery);




// var byb_data_example = [	
// {	"bag": {
// 		"user": "1",
// 		"name": "My First Bag",
// 		"disc": {
// 			"type": "driver",
// 			"name": "Discraft Buzzz SS",
// 			"slug": "discraft-buzzz-ss"
// 		}
// 	}
// }
// ];


/** The HTTP request and function call **/
// var xmlhttp = new XMLHttpRequest();
// var url = "/wp-content/themes/twentyfifteen-child/byb/bags.json";
// xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//         var byb_data = JSON.parse(xmlhttp.responseText);
//         initByb(user,logged_in,byb_data);
//     }
// };
// xmlhttp.open("GET", url, true);
// xmlhttp.send();
/** END the HTTP request **/
(function($) {
$(document).ready(function() {

$("#clear_bags").click(function() {
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
		console.log( bags_json );
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

	// find if this disc is already set; if so, return before newDisc object is created and the cookie is set
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
		console.log( bags_json );

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
	}
}

// INSERT THE ADD BUTTON INTERFACE
var $bagsMenu = $("<select class='bags-menu'></select>");

var the_bags = false;
var user_meta = false;
promise_bags.success(function(data) {
	the_bags = data;
	console.log( $.parseJSON(the_bags) );
	console.log( $.parseJSON(the_bags)[0] );
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

var $addToBagBtn = $("<button class='add-to-bag'><img class='not-yet-added' src='add-to-bag-icon.png' alt='Add' /><img class='added' src='add-to-bag-success.png' alt='Add' />Add<span class='added'>ed</span> to bag<span class='added'>!</span></button>");

/***					***/
/***	ADD TO BAG 		***/
/***					***/
$addToBagBtn.click(function(e) {
	var type;
	var slug;

// Set page-specific parameters
	if ( $("body").hasClass("single-product") ) { // PDP
		slug = $discSlug;
		type = $("main > div > .summary .product_meta .disc_type a").html();
	} else { // EVERYTHING ELSE
		slug = $(this).parents(".product[data-product-slug]").data("product-slug");
		type = $(this).parents(".product[data-disc-type]").data("disc-type");
	}

	// applies to all
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

// Insert ADD-TO-BAG buttons
if ( $("body").hasClass("single-product") ) {
	if ( $(".add-to-bag").length < 1 ) {
		$("main > div > .summary").prepend( $addToBagBtn ).prepend( $bagsMenu );
	} else {
		$addToBagBtn = $(".add-to-bag");
	}
} else {
	$(".product[data-product-slug]").not(".page-id-45 .disc").each(function() {
		var $this = $(this);
		$addToBagBtn.clone(true).prependTo($this);
		$bagsMenu.clone(true).prependTo($this);
	});
}

// Deactivate 'add to bag' buttons for already-added discs
(function() {
	var the_bags = false;
	var user_meta = false;
	promise_bags.success(function(data) {
		the_bags = data;
		console.log( $.parseJSON(the_bags) );
		console.log( $.parseJSON(the_bags)[0] );
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
							$this.addClass("success");
						}
					}
				}
			});
		}
	}
})();

/***						***/
/***	REMOVE FROM BAG 	***/
/***						***/
function removeFromBag(e, bag, disc) {
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
				updateBags( JSON.stringify(the_bags) );
				Cookies.set("byb", the_bags, { expires: 1000, path: "/", domain: ".hyzershop.com" });
				location.reload();
			}
		}
	}
}

//var $removeBtn = $("<img class='remove-from-bag' src='/images/trash-icon.png' alt='remove' />");
var $removeBtn = $(".remove-from-bag");
$removeBtn.click(function(e) {
	var slug = $(this).parents(".disc[data-product-slug]").data("product-slug");

	$bag = $(this).parents("div[data-bag-name]").data("bag-name");

	removeFromBag( e, $bag, slug );
});

// $(".page-id-45 .disc[data-product-slug]").each(function() {
// 	$removeBtn.clone(true).appendTo($(this));
// });




// EDIT BAG
$(".bag-edit-btn").each(function() {
	if ( $(this).siblings("form.edit-bag-name").length ) {
		$(this).addClass("bag-name-edit-btn");
	}
});
$("form.edit-bag-name").submit(function(e) {
	e.preventDefault();
	e.stopPropagation();
	var $this = $(this);
	var $editBagBtn = $this.siblings(".bag-edit-btn");
	var $bagNameInput = $this.find("input[type='text']");
	var $bagTitle = $this.siblings("h2");
	var bagName = $bagTitle.text();
	var newName = $bagNameInput.val();

	$editBagBtn.show();

	if ( $bagNameInput.is(":focus") ) {
		$bagNameInput.blur();
	}

	editBagName( newName, bagName );
});

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
})();


$(".disc").hover(function() {
	if ( $(this).next(".disc").length ) {
		$(this).next(".disc").toggleClass("get-out-the-way");
	}
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
(function($) {
$(document).ready(function() {

console.log( Cookies.get('byb') );

$("#clear_bags").click(function() {
	Cookies.remove('byb');
});

function getBags(bc) {
	if ( Cookies.get('byb') ) {
		var the_bags = Cookies.getJSON('byb');
		for (index = 0; index < the_bags.length; index++) {
			var bag_slug = the_bags[index]['name'].replace(/ /g, "-").toLowerCase();
			var discs = the_bags[index].discs;
			var $bag = $("<div class='bag bag-" + bag_slug + "'><h2>" + the_bags[index]['name'] + "</h2><div class='drivers'><h3>Drivers</h3><div class='disc-area'></div></div><div class='midranges'><h3>Mid-ranges</h3><div class='disc-area'></div></div><div class='putters'><h3>Putters</h3><div class='disc-area'></div></div></div>");
			bc.append($bag);
			for (i = 0; i < discs.length; i++) {
				var $the_disc = $("<div class='disc'><a href='/product/" + discs[i]['slug'] + "'><img src='/wp-content/uploads/" + discs[i]['slug'] + ".png' alt='" + discs[i]['name'] + "' /></a></div>");
				if ( discs[i]["type"] === "distance driver" || discs[i]["type"] === "fairway driver" ) {
		    		$bag.find(".drivers .disc-area").prepend( $the_disc );
		    	}
		    	if ( discs[i]["type"] === "midrange" ) {
		    		$bag.find(".midranges .disc-area").prepend( $the_disc );
		    	}
		    	if ( discs[i]["type"] === "putter" ) {
		    		$bag.find(".putters .disc-area").prepend( $the_disc );
		    	}
			}
		}
	} else {
		bc.append("<div class='add-first-bag'><img src='/wp-content/themes/storefront-child/images/add-first-bag.png' alt='add your first disc' /></div>");
	}
}

// BAG STRUCTURE:
function addToBag(bag, disc, t) {
	if ( Cookies.get('byb') ) {
		var the_bags = Cookies.getJSON('byb');
	} else {
		var the_bags = [
			{
				"name": "My Bag",
				"discs": [
					{
					"slug": "",
					"name": "",
					"type": ""
					}
				]
			}
		];
	}

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
			if ( $(".add-to-bag-failure").length === 0 ) {
				var $fail = $("<div class='add-to-bag-failure'>Already added! <a href='/build-your-bag'>view your bag</a></div>");
				$fail.appendTo("body").delay(2000).fadeOut(400, function() {
					$(this).remove();
				});
			}
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
	Cookies.set('byb', bags_json, { expires: 1000 });

// ON SUCCESS:
	if ( $(".add-to-bag-success").length === 0 ) {
		var $success = $("<div class='add-to-bag-success'>Added to bag! <a href='/build-your-bag'>view your bag</a></div>");
		$success.appendTo("body").delay(5000).fadeOut(400, function() {
			$(this).remove();
		});
	}
}

// INSERT THE ADD BUTTON INTERFACE
var $bagsMenu = $("<select class='bags-menu'></select>");
if ( Cookies.get('byb') ) {
	var the_bags = Cookies.getJSON('byb');
	for (i = 0; i < the_bags.length; i++ ) {
		var bagSlug = the_bags[i]["name"];
		var bagName = bagSlug.replace(/\-/g, " ");
		$bagsMenu.append("<option value='" + bagName + "'>" + bagName + "</option>");
	}
} else {
	$bagsMenu.append("<option value='My Bag'>My Bag</option>");
}
var $addToBagBtn = $("<button class='add-to-bag'>Add to bag</button>");

if ( $("body").hasClass("single-product") ) {
	if ( $(".add-to-bag").length < 1 ) {
		$("main > div > .summary").prepend( $addToBagBtn ).prepend( $bagsMenu );
	} else {
		$addToBagBtn = $(".add-to-bag");
	}
} else {
	$(".product[data-product-slug]").each(function() {
		var $this = $(this);
		$addToBagBtn.clone().prependTo($this);
		$bagsMenu.clone().prependTo($this);
	});
}

/***					***/
/***	ADD TO BAG 		***/
/***					***/

$addToBagBtn.click(function() {
	var type;
	var slug;

	if ( $("body").hasClass("single-product") ) {
		slug = $discSlug;
		type = $("main > div > .summary .product_meta .disc_type a").html();
	} else {
		slug = $(this).parents(".product[data-product-slug]").data("product-slug");
		type = $(this).parents(".product[data-disc-type]").data("disc-type");
	}
	$bagsMenu = $(this).parents(".product").find(".bags-menu");

	addToBag( $bagsMenu.val(), slug, type );
});

$("form.woocommerce-checkout input[type='submit']").click(function() {
	var $cartItem = $(this).parents("#payment").prev(".shop_table").find(".cart_item");
	$bag = $bagsMenu.find("option").first().attr("value");
	$cartItem.each(function() {
		var $this = $(this);
		slug = $this.data("product-slug");
		type = $this.data("disc-type");
		addToBag( $bag, slug, type );
	});

	console.log("clicked " + $bag + $cartItem);

});



// Update your bag using the form
$("#byb-form").submit(function(e) {
	e.preventDefault();
	$("#byb-form input").each(function() {
		$(this).blur();
	});

	var $bag_name = $("#byb-form #bag_name").val();
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
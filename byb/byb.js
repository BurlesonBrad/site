(function($) {
$(document).ready(function() {

//Cookies.remove('byb');

function getBags(bc) {
	if ( Cookies.get('byb') ) {
		var the_bags = Cookies.getJSON('byb');
		for (index = 0; index < the_bags.length; index++) {
			var discs = the_bags[index].discs;
			var $bag = $("<div class='bag bag-" + the_bags[index]['name'] + "'><h2>" + the_bags[index]['name'] + "</h2><div class='bag-inner'><div class='drivers'></div><div class='midranges'></div><div class='putters'></div></div></div>");
			bc.append($bag);
			for (i = 0; i < discs.length; i++) {
				var $the_disc = $("<div class='disc'><img src='/wp-content/uploads/" + discs[index]['slug'] + ".png' alt='" + discs[index]['name'] + "' /></div>");
				if ( discs[index]["type"] === "distance-driver" || discs[index]["type"] === "fairway-driver" ) {
		    		$bag.find(".drivers").prepend( $the_disc );
		    	}
		    	if ( discs[index]["type"] === "midrange" ) {
		    		$bag.find(".midranges").prepend( $the_disc );
		    	}
		    	if ( discs[index]["type"] === "putter" ) {
		    		$bag.find(".putters").prepend( $the_disc );
		    	}
			}
		}
		console.log("item added");
	} else {
		bc.append("<div class='add-first-bag'><img src='/wp-content/themes/storefront-child/images/add-first-bag.png' alt='add your first disc' /></div>");
	}
}

function addToBag(bag, discs, types) {
	if ( Cookies.get('byb') ) {
		var the_bags = Cookies.getJSON('byb');
	} else {
		var the_bags = [
			{
				"name": "",
				"discs": []
			}
		]
	}

	for ( i = 0; i < the_bags.length; i++ ) {
		if ( the_bags[i]["name"] = bag ) {
			var bagIndex = i;
		} else {
			var bagIndex = 0;
		}
	}

	for ( i = 0; i < discs.length; i++ ) {
		var slg = discs[i];
		var n = slg.replace(/\-/g, " ");
		var type = types[i];
		var newDisc = {};

		if ( the_bags[bagIndex].discs[i].slug != slg ) {
			newDisc["slug"] = slg;
			newDisc["name"] = n;
			newDisc["type"] = type;
			the_bags[bagIndex].discs.push(newDisc);
		}
	}

	if ( JSON.stringify(newDisc).indexOf("slug") === -1 ) {
		if ( $(".add-to-bag-failure").length === 0 ) {
			var $fail = $("<div class='add-to-bag-failure'>Already added! <a href='/build-your-bag'>view your bag</a></div>");
			$fail.appendTo("body").delay(2000).fadeOut(400, function() {
				$(this).remove();
			});
		}
		return;
	}

	var bags_json = JSON.stringify(the_bags);
	Cookies.set('byb', bags_json, { expires: 1000 });

	console.log( Cookies.get('byb') );
	if ( $(".add-to-bag-success").length === 0 ) {
		var $success = $("<div class='add-to-bag-success'>Added to bag! <a href='/build-your-bag'>view your bag</a></div>");
		$success.appendTo("body").delay(5000).fadeOut(400, function() {
			$(this).remove();
		});
	}
}

if ( $("body").hasClass("page-id-45") ) {
	var $bag_container = $("#bags");
	getBags( $bag_container );
}

if ( $("body").hasClass("single-product") ) {
	if ( $(".add-to-bag").length < 1 ) {
		var $bagsMenu = $("<select class='bags-menu'></select>");

		if ( Cookies.get('byb') ) {
			var the_bags = Cookies.getJSON('byb');
			for (i = 0; i < the_bags.length; i++ ) {
				var bagSlug = the_bags[i]["name"];
				var bagName = bagSlug.replace(/\-/g, " ");
				$bagsMenu.append("<option value='" + bagName + "'>" + bagName + "</option>");
			}
		} else {
			$bagsMenu.append("<option value='new-bag'>New Bag</option>");
		}

		var $addToBagBtn = $("<button class='add-to-bag'>Add to bag</button>");
		$("main > div > .summary").prepend( $addToBagBtn ).prepend( $bagsMenu );
	} else {
		var $addToBagBtn = $(".add-to-bag");
		var $bagsMenu = $(".bags-menu");
	}

	$addToBagBtn.click(function() {
		var imgSrc = $(".woocommerce-main-image img").attr("src");
		var dirIndex = imgSrc.indexOf("uploads");
		var slugIndex = dirIndex + 8;
		var slug = [];
		var type = [];

		type.push( $("main > div > .summary .product_meta .disc_type a").html() );
		slug.push( imgSrc.substring( slugIndex ).replace(".png", "") );

		addToBag( $bagsMenu.val(), slug, type );
	});
}




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
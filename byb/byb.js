(function($) {
$(document).ready(function() {

//Cookies.remove('byb');

function getBag(bc) {
	if ( Cookies.get('byb') ) {
		var the_bag = Cookies.getJSON('byb');
		var discs = the_bag.bag.discs;
		for (index = 0; index < discs.length; ++index) {
		    bc.prepend("<div class='disc'><img src='/wp-content/uploads/" + discs[index]['slug'] + ".png' alt='" + discs[index]['name'] + "' /></div>");
		}
	} else {
		bc.prepend("<div class='add-first-disc'><img src='/wp-content/themes/storefront-child/images/add-first-disc.png' alt='add your first disc' /></div>");
	}
}


function addToBag(discs, types) {
	if ( Cookies.get('byb') ) {
		var the_bag = Cookies.getJSON('byb');
	} else {
		var the_bag = { 
			"bag": {
				"name": "",
				"discs": []
			}
		};
	}

	for ( i = 0; i < discs.length; ++i ) {
		var slg = discs[i];
		var n = slg.replace("-", " ");
		var type = types[i];
		var newDisc = {};
		newDisc["slug"] = slg;
		newDisc["name"] = n;
		newDisc["type"] = type;

		if ( JSON.stringify(the_bag).indexOf(slg) === -1 ) {
			the_bag.bag.discs.push(newDisc);
		}
	}

	if ( newDisc.length < 1 ) {
		return;
	}

	var bag_json = JSON.stringify(the_bag);
	Cookies.set('byb', bag_json, { expires: 1000 });

	console.log( Cookies.get('byb') );
}

if ( $("body").hasClass("single-product") ) {
	if ( $(".add-to-bag").length < 1 ) {
		var $addToBagBtn = $("<button class='add-to-bag'>Add to bag</button>");
		$("main > div > .summary").prepend( $addToBagBtn );
	} else {
		var $addToBagBtn = $(".add-to-bag");
	}

	var imgSrc = $(".woocommerce-main-image img").attr("src");
	var dirIndex = imgSrc.indexOf("uploads");
	var slugIndex = dirIndex + 8;
	var slug = [];
	var type = [];
	type.push( $("main > div > .summary .product_meta .disc_type a").html() );
	slug.push( imgSrc.substring( slugIndex ).replace(".png", "") );

	$addToBagBtn.click(function() {
		addToBag( slug, type );
	});
}


if ( $("body").hasClass("page-id-45") ) {
	var $bag_container = $("#bag");
	getBag( $bag_container );
}




// Update your bag using the form
$("#byb-form").submit(function(e) {
	e.preventDefault();
	$("#byb-form input").each(function() {
		$(this).blur();
	});

	var $bag_name = $("#byb-form #bag_name").val();
	var $disc_1 = "Discraft Buzzz SS";
	var $disc_1_type = "Midrange";
	var $disc_2 = "Discraft Nuke OS";
	var $disc_2_type = "Driver";
	
	var the_bag = { 
		"bag": {
			"name": $bag_name,
			"discs": []
		}
	};

	the_bag.bag.discs[i]["name"] = $disc_name;
	
 	var bag_json = JSON.stringify(the_bag);
 	Cookies.set('byb', bag_json, { expires: 1000 });
 	
 	return false;
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
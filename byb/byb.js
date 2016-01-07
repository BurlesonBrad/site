(function($) {
$(document).ready(function() {


var bybWrapper = $("#byb-wrapper"),
	wp_user = bybWrapper.attr("data-user"),
	user = ( wp_user != "0" ? wp_user : makeid() ),
	logged_in = ( wp_user != "0" ? true : false );
	
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
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
	
	var bag_json = { 
		"bag": {
			"name": $bag_name,
			"discs": [
				{
					"name": $disc_1,
					"type": $disc_1_type
				},
				{
					"name": $disc_2,
					"type": $disc_2_type
				}
			]
		}
	};
	
 	var bag_json_string = JSON.stringify(bag_json);
 	Cookies.set('byb', bag_json_string, { expires: 1000 });
 	
 	return false;
});

initBag(user,logged_in);

function initBag(u,l) {
// get user data (not using that in this version)
	console.log("user? " + u + " | logged in? " + l);
	
// get the bag
	var byb_data = Cookies.getJSON('byb'),
		$bag_name = byb_data.bag.name,
		$disc_1_name = byb_data.bag.discs[1].name;
	console.log($bag_name + " | " + $disc_1_name);
	
	// use a for loop to display all that data!
}

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
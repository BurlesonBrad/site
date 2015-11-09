$("#countdown").countdown("2016/02/20", function(event) {
    $("#months").text(
        event.strftime('%m')
    );
    $("#days").text(
        event.strftime('%n')
    );
    $("#hours").text(
        event.strftime('%H')
    );
    $("#minutes").text(
        event.strftime('%M')
    );
    $("#seconds").text(
        event.strftime('%S')
    );
});

// called in front-page.php
function tileFullHeight() {
	var tile = $(this),
		tilePadding = parseInt(tile.css("padding-top"), 10) + parseInt(tile.css("padding-bottom"), 10),
		windowWidth = $(window).width(),
		windowHeight = $(window).height(),
		mastheadHeight = $("#masthead").outerHeight(),
		containerHeight = windowHeight - mastheadHeight, // - socialHeight
		newHeight = containerHeight - tilePadding + "px"
		signupTile = $(".signup-tile"),
		blogTile = $(".blog-tile");
		
	if (windowWidth > 960 && windowHeight > 610) {
		tile.css({
			height: newHeight
		});
	} else {
		tile.css({
			height: "auto",
			"padding-bottom": "90px"
		});
		if (tile.hasClass("blog-tile") && windowWidth > 960) {
			var heightDiff = signupTile.outerHeight() - blogTile.outerHeight();
			blogTile.css({"padding-bottom": 90 + heightDiff + "px"});
		}
	}
	
	console.log(windowWidth/windowHeight);

// 	if (tile.hasClass("blog-tile") === true && blogTile.height() < signupTile.height()) {
// 		var paddingDiff = parseInt(blogTile.css("padding-top"), 10) - parseInt(signupTile.css("padding-top"), 10),
// 			newBlogTileHeight = signupTile.height() - paddingDiff + "px";
// 		$(this).css("min-height", newBlogTileHeight);
// 	} else if (tile.hasClass("signup-tile") === true && blogTile.height() > signupTile.height()) {
// 		var paddingDiff = parseInt(signupTile.css("padding-top"), 10) - parseInt(blogTile.css("padding-top"), 10),
// 			newSignupTileHeight = blogTile.height() - paddingDiff + "px";
// 		$(this).css("min-height", newSignupTileHeight);
// 	}
}

setTimeout(submitVertAlign, 200);
$(window).resize(submitVertAlign);
function submitVertAlign() {
    if ($(window).width() >= 600) {
        var formHeight = $("#text-inputs").outerHeight() + $("#brands").outerHeight(),
            submitMargin = -(formHeight/1.29) + "px";
        $("#submit-group").css("margin-top", submitMargin);
    } else {
        $("#submit-group").css("margin-top", "-227px");
    }
}

$("#brand-checkboxes label").click(function() {
	$(this).prev("input").click();
});

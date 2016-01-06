(function($) {

$(document).ready(function() {
	$("#sb_instagram").appendTo("#main");

	function customMasthead() {
		var $utilNavWrap = $("<div class='nav-top'></div>");
		var $utilNav = $("<div class='col-full'></div>");
		$utilNavWrap.wrapInner($utilNav);

		$utilNavWrap.prependTo("#masthead");
		$("header .secondary-navigation").prependTo($utilNav);
		$("header .site-branding").prependTo($utilNav);
	}
	customMasthead();

});

$(window).load(function() {
	$("style").each(function() {
		var content = $(this).html();
		if ( content.indexOf("width: /*inherit*/") > -1 ) {

			newContent = content.replace("/*inherit*/100%", "100.1%");
			$(this).html(newContent);
		}
	});
});


})(jQuery);
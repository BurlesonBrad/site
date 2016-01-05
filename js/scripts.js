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


})(jQuery);
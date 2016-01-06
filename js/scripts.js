(function($) {

$(document).ready(function() {
	$("body, html").addClass("js");

	$("#sb_instagram").appendTo("#main");

	function customMasthead() {
		var $utilNavWrap = $("<div class='nav-top'></div>");
		var $utilNav = $("<div class='col-full'></div>");
		$utilNavWrap.wrapInner($utilNav);

		$utilNavWrap.prependTo("#masthead");
		$("header .secondary-navigation").prependTo($utilNav);
		$("header .site-branding").prependTo($utilNav);

		var $menuHome = $("ul#menu-main-menu li:first-child > a");
		$menuHome.html("<img src='/wp-content/themes/storefront-child/images/logo-white.png' alt='Hyzer Shop' width='88' height='55' />")
	}
	customMasthead();

});


})(jQuery);
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
		var liHeight = $menuHome.parent().height();
		$menuHome.html("<img src='/wp-content/themes/storefront-child/images/logo-white.png' alt='Hyzer Shop' width='74' height='46' style='padding-top:5px;' />")
			.css({
				paddingTop: 0,
			    paddingBottom: 0,
			    "vertical-align": "middle",
			    display: "inline-block"
			})
			.parent().css({
				"line-height": liHeight
			});
	}
	customMasthead();
	$(window).resize(customMasthead);

	function vAlignSliderCaption() {
		var captionWrap = $(".metaslider .caption-wrap");
		var height = captionWrap.height();
		captionWrap.css({
			"line-height": height
		});
	}
	vAlignSliderCaption();
	$(window).resize(vAlignSliderCaption);

});


})(jQuery);
(function($) {

$(document).ready(function() {
	$("body, html").addClass("js").removeClass("no-js");

	$("#sb_instagram").appendTo("#main");

	function customMasthead() {
		var $utilNavWrap = $("<div class='nav-top'></div>");
		var $utilNav = $("<div class='col-full'></div>");
		var $menuHome = $("ul#menu-main-menu li:first-child > a");
		var liHeight = $menuHome.parent().height();

		if ( !$("body").hasClass("custom-masthead-set") ) {
			$("body").addClass("custom-masthead-set");

			$utilNavWrap.wrapInner($utilNav);

			$utilNavWrap.prependTo("#masthead");
			$("header .secondary-navigation").prependTo($utilNav);
			$("header .site-branding").prependTo($utilNav);
			$("#woocommerce_product_search-2").prependTo($utilNav);
			$(".header-widget-region").remove();
		}
		
		if ( $(window).width() > 844 ) {
			$menuHome.html("<img src='/wp-content/themes/storefront-child/images/logo-white.png' alt='Hyzer Shop' width='74' height='46' style='padding-top:5px;' />")
				.css({
					paddingTop: 0,
				    paddingBottom: 0,
				    "vertical-align": "middle",
				    display: "inline-block"
				})
				.parent().css({
					"line-height": liHeight + "px"
				});
		}
	}
	customMasthead();
	$(window).resize(customMasthead);

	function vAlignSliderCaption() {
		var captionWrap = $(".metaslider .caption-wrap");
		var height = captionWrap.height();
		captionWrap.css({
			"line-height": (height-40) + "px"
		});
	}
	$(window).load(vAlignSliderCaption).resize(vAlignSliderCaption);

	function dynamicBasket() {
		var $cartContents = $(".site-header-cart .cart-contents");
		var $basket = $("#dynamic_basket");
		$basket.appendTo( $cartContents ).show();
	}
	setTimeout( dynamicBasket, 1000 );
});


})(jQuery);
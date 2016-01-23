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

	function dynamicBasket(add) {
		var $cartItems = ( $("#masthead").data("cart-items") <= 3 || $("#masthead").data("cart-items") === 'empty' ) ? $("#masthead").data("cart-items") : 3;
		if ( $cartItems == 0 ) {
			$cartItems = 'empty';
		}
		if ( add === 1 ) {
			if ( $cartItems != 'empty' ) {
				$cartItems = $cartItems + add;
			} else {
				if ( add > 0 ) {
					$cartItems = add;
				}
			}
		}
		$("#masthead").attr("data-cart-items", $cartItems).data("cart-items", $cartItems);

		var $cartContents = $(".site-header-cart .cart-contents");
		var $basket = $('<img id="dynamic_basket" src="/wp-content/themes/storefront-child/images/basket-white-' + $cartItems + '.png" style="display:none; width:25px; height:37px;" width="25" height="37" />').hide();

		if ( !$("#dynamic_basket").length ) {
			$basket.appendTo( $cartContents ).show();
		} else {
			$("#dynamic_basket").attr("src", "/wp-content/themes/storefront-child/images/basket-white-" + $cartItems + ".png");
		}
	}
	setInterval(function() {
		dynamicBasket(0);
	}, 1000);
	$(".add_to_cart_button").on("click", function() {
		dynamicBasket(1);
	});

	function replaceCartWithBasket() {
		$(".site-header-cart").find("li").each(function() {
			var $this = $(this);
			if ( $this.children().length < 1 ) {
				var text = $this.html();
				var newText = text.replace( "cart", "basket" );
				$this.html( newText );
			}
		});
	}
	replaceCartWithBasket();

	function hideMessage() {
		if ( $("body").hasClass("woocommerce-checkout") || $("body").hasClass("woocommerce-cart") ) {
			return;
		}
		$(".woocommerce-error, .woocommerce-info, .woocommerce-message, .woocommerce-noreviews, p.no-comments").each(function() {
			var $this = $(this);
			$this.addClass("message-top");
			setTimeout(function() {
				$this.fadeOut(400);
			}, 3000);
		});
	}
	hideMessage();

	function singleProductFlightData() {
		if ( !$("body").hasClass("single-product") ) { return; }
		
		var $product = $("main > .product[data-product-slug]");
		var $shortDesc = $(".summary div[itemprop='description']");
		var $longDesc = $("#tab-description");
		var $statsContainer = $("<ul id='flight-stats'></ul>");
		var speed = $product.data("speed");
		var glide = $product.data("glide");
		var turn = $product.data("turn");
		var fade = $product.data("fade");

		$shortDesc.before( $statsContainer );
		$statsContainer.prepend("<li class='number-bubble speed'>" + speed + "</li><li class='number-bubble glide'>" + glide + "</li><li class='number-bubble turn'>" + turn + "</li><li class='number-bubble fade'>" + fade + "</li>");
		
		var delay = 0;
		$statsContainer.find("li").each(function(index) {
			delay = 100 * (index + 1); 
			setTimeout(function() {
				$(this).addClass("animate-in");
			}, delay);
		});
	}
	singleProductFlightData();

});


})(jQuery);
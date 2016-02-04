(function($) {

$(document).ready(function() {
	$("body, html").addClass("js").removeClass("no-js");

	$("#sb_instagram").appendTo("#main");

	function customMasthead() {
		var $utilNavWrap = $("<div class='nav-top'></div>");
		var $utilNav = $("<div class='col-full'></div>");
		var $menuHome = $("ul#menu-main-menu > li:first-child > a");
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

		var $logo = $("<img src='/wp-content/themes/storefront-child/images/logo-white.png' alt='Hyzer Shop' width='74' height='46' style='padding-top:5px;' />");

		if ( $(window).width() > 1136 ) {
			$menuHome.html($logo)
				.css({
					paddingTop: 0,
				    paddingBottom: 0,
				    "vertical-align": "middle",
				    display: "inline-block"
				})
				.parent().css({
					"line-height": liHeight + "px"
				});
		} else if ( 768 < $(window).width() < 1136 ) {
			$menuHome.html($logo)
				.css({
					paddingTop: 0,
				    paddingBottom: 0,
				    "vertical-align": "middle",
				    display: "inline-block"
				})
				.parent().css({
					"line-height": "7.1em"
				});
				$logo.css({
					width: "6.4em"
				});
		}
	}
	customMasthead();
	$(window).resize(customMasthead);
	
	var tweakSlider = {
		fadeSliderIn: function (s) {
//			var sliderExists = s.length;
//			if ( sliderExists < 1 ) {
//				return false;
//				tweakSlider.fadeSliderIn(s);
//			} else {
				s.animate({
					opacity: 1
				}, 800);
				return true;
//			}
		},
		testSlider: function () {
			setTimeout(function() {
				var sliderExists = $(".metaslider").length;
				if ( sliderExists > 0 ) {
					tweakSlider.fadeSliderIn( $(".metaslider") );

					function vertAlign() {
						var $captionWrap = $(".metaslider .caption-wrap");
						var height = $captionWrap.height();
						$captionWrap.css({
							"line-height": (height-40) + "px"
						});
					}
					vertAlign();
					$(window).resize(function() {
						vertAlign();
					});

					responsiveText(".metaslider .caption-wrap", 4.2, 6.8, "em", 960, 1600, "high");
					responsiveText(".metaslider .caption-wrap", 3.4, 4.2, "em", 300, 959, "low");

					return true;
				} else {
					tweakSlider.testSlider();
				}
			}, 500);
		},
	};
	tweakSlider.testSlider();
	

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
		var $inboundsID = $product.data("inbounds-id");
		var $discType = $product.data("disc-type");
		var $productTitle = $(".summary h1[itemprop='name']");
		var $longDesc = $("#tab-specs_tab");
		var $statsContainer = $("<ul id='flight-stats'></ul>");
		var stats = {
			speed: $product.data("speed"),
			glide: $product.data("glide"),
			turn: $product.data("turn"),
			fade: $product.data("fade")
		};
		var typeLabel = $discType.replace(/s$/, "").replace(/-/g, " ");
		if ( typeLabel == "mid range" ) { typeLabel = "mid-range" }

		$productTitle.append( "<sup>" + typeLabel + "</sup>" ).after( $statsContainer );
		var $bubbles = {};
		var delay = 200;
		$.each( stats, function( i, val ) {
			$bubbles[i] = $("<li class='bubble-wrap " + i + "'><span class='number-bubble'><span class='bubble-inner'><span class='stat-name'>" + i + "</span><span class='stat-value'>" + val + "</span></span></span></li>");
			$statsContainer.append( $bubbles[i] );
			delay = delay + 100; 
			setTimeout(function() {
				$bubbles[i].find(".number-bubble").addClass("animate-in");
			}, delay);
		});

		var $flightChart = $("<div class='flight-chart'><img src='http://www.inboundsdiscgolf.com/content/WebCharts/" + $product.data('inbounds-id') + ".png' alt='Inbounds flight chart for " + $product.data('product-slug') + "' />");
		$longDesc.prepend($flightChart);
	}
	singleProductFlightData();

	function archivePageHeaders() {
		var tax_disc_brand = $("h2[data-brand]").first().data("brand");

		var tax_disc_type = $(".page-title[data-disc-type]").first().data("disc-type");
		if ( tax_disc_brand ) {
			tax_disc_brand = tax_disc_brand.replace("-", " ");
			tax_disc_brand = tax_disc_brand.replace("mid range", "mid-range");
			$(".page-title")
				.html("<img src='/wp-content/themes/storefront-child/images/" + tax_disc_brand + "-logo-white.png' alt='" + tax_disc_brand + "' />")
				.css({"background-image": "url('/wp-content/themes/storefront-child/images/" + tax_disc_brand + "-banner.jpg')"})
				.prependTo("#content");
		}
		if ( tax_disc_type ) {
			$(".page-title")
				.html("<img src='/wp-content/themes/storefront-child/images/disc-type-" + tax_disc_type + ".png' alt='" + tax_disc_type + "' />")
				.css({"background-image": "url('/wp-content/themes/storefront-child/images/" + tax_disc_type + "-banner.jpg')"})
				.prependTo("#content");
		}
	}
	archivePageHeaders();

	function videoAspectRatio() {
		var $iframe = $(".featured-video-plus > iframe");
		var frameWidth = $iframe.width();
		$iframe.css({
			height: frameWidth / 1.785 + "px"
		});
	}
	videoAspectRatio();
	$(window).resize( videoAspectRatio );

	function responsiveText(t, min, max, unit, minWidth, maxWidth, i) {
		var $t = t instanceof jQuery ? t : $(t);
		var sizeI = parseInt( $t.css("font-size"), 10 );
		function setSize(text) {
			var winWidth = $(window).width();
			var newSize;
			if ( winWidth > minWidth && winWidth < maxWidth ) {
				var ratio = (winWidth - minWidth)/(maxWidth - minWidth);
				newSize = ratio*(max-min) + minWidth;
			}
			if ( winWidth <= minWidth && i !== "high" ) {
				newSize = min;
			}
			if ( winWidth >= maxWidth && i !== "low" ) {
				newSize = max;
			}
			text.css({
				"font-size": newSize + unit
			});
		}
		setSize($t);
		$(window).resize(function() {
			setSize($t);
		});
	}

	function feauxLazyLoad( section ) {
		if ( !$("body").hasClass("home") ) { return; }

		var $section = $(section);
		var headerHeight = $("#masthead").outerHeight(true);
		var bannerHeight = $("#content > .metaslider").outerHeight(true);
		var mainPadding = parseInt( $("main").css("padding-top"), 10 );
		var winHeight = $(window).height();
		var heightBefore = headerHeight + bannerHeight + mainPadding;

		$section.each(function(index) {
			var prevSectionsHeight = 0;
			var $this = $(this);
			if ( index > 0 ) {
				$this.css({
					opacity: 0
				});
			}
			$this.prevAll("section").each(function() {
				prevSectionsHeight += $(this).outerHeight(true);
			});
			$(window).scroll(function() {
				FFLinit($this);
			});
			FFLinit($this);

			function FFLinit(t) {
				if ( $(window).scrollTop() > (heightBefore + prevSectionsHeight - winHeight + 200) ) {
					t.animate({
						opacity: 1
					}, 500);
				}
			}
		});
	}
	feauxLazyLoad("section");


	function filterIcons() {
		$("form.searchandfilter > ul > li").each(function() {
			var $this = $(this),
				fieldName = $this.data("sf-field-name").replace(/\_/g, "");

			$this.prepend("<img class='filter-icon' alt='" + fieldName + "' src='/wp-content/themes/storefront-child/images/" + fieldName + "-icon.png' />");
		});
	}
	filterIcons();



	// function featuredVidTitle() {
	// 	var $vid = $(".no-touchevents .featured-video-plus");
	// 	console.log( $vid );
	// 	var $title = $("<div class='video-of-the-week-title'>Video of the week</div>");
	// 	$vid.append( $title );
	// 	$("body").blur(function() {
	// 		$vid.addClass("vid-in-focus");
	// 	}).focus(function() {
	// 		$vid.removeClass("vid-in-focus");
	// 	});
	// }
	// featuredVidTitle();
});


})(jQuery);
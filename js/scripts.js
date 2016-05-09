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

		var $logo = $("<img src='/wp-content/themes/storefront-child/images/wordmark-white.png' alt='Hyzer Shop' width='96' height='51' />");

		// if ( $(window).width() > 1280 ) {
		// 	$menuHome.html($logo)
		// 		.css({
		// 			paddingTop: 0,
		// 		    paddingBottom: 0,
		// 		    "vertical-align": "middle",
		// 		    display: "inline-block"
		// 		})
		// 		.parent().css({
		// 			"line-height": liHeight + "px"
		// 		});
		// } else 
		if ( $(window).width() > 768 ) {
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
					width: "11em"
				});
		}
	}
	customMasthead();
	$(window).resize(customMasthead);
	
	var tweakSlider = {
		fadeSliderIn: function (s) {
			TweenMax.to(s, 0.8, {
				css: {
					opacity: 1
				}
			});
			return true;
		},
		testSlider: function () {
			setTimeout(function() {
				var sliderExists = $(".metaslider .caption-wrap").length;
				var sliderHeight = $(".metaslider .caption-wrap").height();
				if ( sliderExists && sliderHeight ) {
					tweakSlider.fadeSliderIn( $(".metaslider") );

					function vertAlign() {
						var $captionWrap = $(".metaslider .caption-wrap");
						var height = $captionWrap.height();
						$captionWrap.css({
							"line-height": height + "px"
						});
					}
					vertAlign();
					$(window).resize(function() {
						vertAlign();
					});

					responsiveText(".metaslider .caption", 2, 3, "em", 960, 1600, "high");
					responsiveText(".metaslider .caption", 1.5, 2, "em", 300, 959, "low");
					responsiveText(".metaslider .caption button", 0.6, 0.38, "em", 300, 1600);

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
		if ( $("main > .product").data("category") !== "discs" ) { return; }
		
		var $product = $("main > .product[data-category='discs']");
		var $inboundsID = $product.data("inbounds-id");
		var $discType = $product.data("disc-type");
		var $productTitle = $(".summary h1[itemprop='name']");
		var $longDesc = $("#tab-specs_tab");
		var $statsContainer = $("<ul id='flight-stats'></ul>");
		var stats = {
			speed: parseInt($product.data("speed"), 10),
			glide: parseInt($product.data("glide"), 10),
			turn: parseInt($product.data("turn"), 10),
			fade: parseInt($product.data("fade"), 10)
		};
		var stability = function() {
			if ( stats.fade + stats.turn >= 3 ) {
				return "_sft_pa_stability=overstable";
			}
			else if ( stats.fade + stats.turn < 0 ) {
				return "_sft_pa_stability=understable";
			}
			else if ( stats.fade + stats.turn < 3) {
				return "_sft_pa_stability=stable";
			}
		}();
		var typeLabel = $discType.replace(/s$/, "").replace(/-/g, " ");
		if ( typeLabel == "mid range" ) { typeLabel = "mid-range" }

		$productTitle.append( "<sup>" + typeLabel + "</sup>" ).after( $statsContainer );
		var $bubbles = {};
		var delay = 200;
		$.each( stats, function( i, val ) {
			$bubbles[i] = $("<li class='bubble-wrap " + i + "'><span class='number-bubble'><span class='bubble-inner'><span class='stat-name'>" + i + "</span><span class='stat-value'>" + val + "</span></span></span></li>");
			$bubbles[i] = $bubbles[i].wrapInner("<a href='/shop/?" + stability + "'></a>");
			$statsContainer.append( $bubbles[i] );
			delay = delay + 100; 
			setTimeout(function() {
				$bubbles[i].find(".number-bubble").addClass("animate-in");
			}, delay);
		});

		var $flightChart = $("<div class='flight-chart'><a href='http://inboundsdiscgolf.com' target='_blank'><img src='http://ths09.inboundsdiscgolf.com/" + $product.data('inbounds-id') + ".png' alt='Inbounds flight chart for " + $product.data('product-slug') + "' /></a><span>powered by Inbounds Disc Golf</span></div>");
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
			console.log( winWidth );
			if ( winWidth > minWidth && winWidth < maxWidth ) {
				var ratio = (winWidth - minWidth)/(maxWidth - minWidth);
				newSize = ratio*(max-min) + min;
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
		if ( !$("body").hasClass("home") || $(window).height() > $(window).width() || $(window).width() < 1136 ) { return; }

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
				FLLinit($this);
			});
			FLLinit($this);

			function FLLinit(t) {
				if ( $(window).scrollTop() > (heightBefore + prevSectionsHeight - winHeight + 200) ) {
					TweenMax.to(t, 1, {
						opacity: 1
					});
				}
			}
		});
	}
	//feauxLazyLoad("section");

	function filterIcons() {
		var $filterLi = $("form.searchandfilter > ul > li");
		!$filterLi.find(".filter-icon").length && $filterLi.each(function() {
			var $this = $(this),
				fieldName = $this.data("sf-field-name").replace(/\_/g, "");

			!$this.find(".filter-icon").length && $this.prepend("<img class='filter-icon' alt='" + fieldName + "' src='/wp-content/themes/storefront-child/images/" + fieldName + "-icon.png' />");
		});
	}
	setInterval( filterIcons, 1000 );

	$.fn.extend({
		parallaxBG: function(speed) {
			var that = this;
			var bgPos = parseInt( this.css("background-position-y"), 10 );
			var s = speed || 0.3;
			var $win = $(window);
			$win.scroll(function() {
				var scrollTop = $win.scrollTop();
				TweenMax.to( that, 0.1, {
					css: {
						"background-position-y": bgPos-(scrollTop*s*0.1)
					}
				});
			});	
		}
	});

	//$(".tax-disc-type .page-title, .tax-product_brand .page-title").parallaxBG( 0.2 );

	function customFooterSiteInfo() {
		var date = new Date();
		var year = date.getFullYear();
		$(".site-footer .site-info").html("&copy; Hyzer Shop, LLC. " + year + " All rights reserved.");
	}
	customFooterSiteInfo();

	function getQueryVariable(variable) {
	    var query = window.location.search.substring(1);
	    var vars = query.split('&');
	    if ( vars.length < 1 ) {
	    	return;
	    }
	    for (var i = 0; i < vars.length; i++) {
	        var pair = vars[i].split('=');
	        if (decodeURIComponent(pair[0]) == variable) {
	            return decodeURIComponent(pair[1]);
	        }
	    }
	    console.log('Query variable %s not found', variable);
	}
	if ( getQueryVariable('signedup') === 'true' ) {
		$("#mc_embed_signup").html("<h3 class='rocksalt'>thanks!</h3><p class='blue'>Just click on the link in your email, and you're good to go.</p>");
	}

	function removeSpecsTabForNonDiscs() {
		$("main > div[data-product-slug]").not("div[data-category='discs']").find(".specs_tab_tab, #tab-specs_tab").hide();
		$("main > div[data-product-slug]:not(div[data-category='discs'])").find(".reviews_tab a").click();
	}
	removeSpecsTabForNonDiscs();

	function smartPDPvariations() {
		//var HSselectVariation = setInterval( function() { HSselectVar() }, 1000);
		function HSselectVariation() {
			var over = 0;
			$(".single-product .summary .variations_form select").not( $(this) ).each(function() {
				if ( $(this).find("option").length > 2 ) {
					over++;
				}
			});
			if ( over < 1 ) {
				$(".single-product .summary .variations_form select").each(function() {
					$(this).find("option").eq(0).removeAttr("selected");
					$(this).find("option").eq(1).select().addClass("enabled");

					$(this).val( $(this).find("option").eq(1).attr("value") );
					$(this).parent().trigger( 'woocommerce_variation_select_change' ).trigger( 'check_variations', [ '', false ] );
				});
			}
		}
		setTimeout(function() {
			$(".single-product .summary .variations_form select").each(function() {
				$(this).click( HSselectVariation )
				.blur( HSselectVariation );
			});
		}, 1000);
	}
	smartPDPvariations();

	function footerParallax(c) {
		var scrollDist = $(document).scrollTop() + $(window).height(),
			$footer = $("#colophon"),
			docHeight = $(document).height(),
			a = (c < 0) ? -1 : 1,
			trans = a*(c*(docHeight - scrollDist));
		
		TweenMax.to( $footer, 0.02, {
			css: { "transform": "translateY(" + trans + "px)" }
		});
	}
	// footerParallax(-0.1);
	// $(window).scroll(function() {
	// 	footerParallax(-0.1);
	// });

	$(document).ready(function() {
		$(".single-product .related h2").addClass("block-header");
	});

	$(document).ready(function() {
		$(".menu-item-163 a").attr("target", "_blank");
	});

	// function contactFormMCPost() {
	// 	$(".contact-form").submit(function(e) {
	// 		var $this = $(this);
	// 		if ( !$this.hasClass("mc-submitted") ) {
	// 			var $optIn = $this.find("input[name='gwidget-text-2-getupdatesfromhyzershop']");
	// 			$this.addClass("mc-submitted");

	// 			if ( $optIn.is(":checked") ) {
	// 				e.preventDefault();
	// 				var n = $this.find("#gwidget-text-2-yourname").val();
	// 				var e = $this.find("#gwidget-text-2-youremail").val();
	// 				n = n.split(" ");
	// 				var fname = n[0];
	// 				var lname = n.length > 1 ? n[1] : '';
	// 				var $mc_form = $("#mc_embed_signup form");
	// 				var $fname_field = $mc_form.find("#mce-FNAME");
	// 				var $lname_field = $mc_form.find("#mce-LNAME");
	// 				var $email_field = $mc_form.find("#mce-EMAIL");

	// 				$fname_field.val(fname);
	// 				$lname_field.val(lname);
	// 				$email_field.val(e);

	// 				$mc_form.submit();

	// 				// var person = {
	// 				// 	name: n,
	// 				// 	email: e
	// 				// };

	// 				// $.post( 'http://stage.hyzershop.com/wp-content/themes/storefront-child/contactform-mc-post.php', person, function() {
	// 				// 	console.log(person);
	// 				// });

	// 				$this.submit();
	// 				return false;
	// 			}
	// 		}
	// 	});
	// }
	//$(document).ready(contactFormMCPost);


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
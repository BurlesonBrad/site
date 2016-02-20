<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package storefront
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> <?php storefront_html_tag_schema(); ?> class="no-js">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
<meta name="google-site-verification" content="fiBSqFZpsHgxiUpm7Ootz42dm9kjmE2iGeiimFo3WcM" />
<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700|Viga|Rock+Salt' rel='stylesheet' type='text/css'>
<link href="//cdn-images.mailchimp.com/embedcode/slim-081711.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/wp-content/themes/storefront-child/js/modernizr/modernizr.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/plugins/CSSPlugin.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/easing/EasePack.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenLite.min.js"></script>

</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<?php
	do_action( 'storefront_before_header' ); ?>

	<header data-cart-items="<?php echo dynamic_basket(); ?>" id="masthead" class="site-header" role="banner" <?php if ( get_header_image() != '' ) { echo 'style="background-image: url(' . esc_url( get_header_image() ) . ');"'; } ?>>
		<div class="col-full">
			<?php
			/**
			 * @hooked storefront_skip_links - 0
			 * @hooked storefront_social_icons - 10
			 * @hooked storefront_site_branding - 20
			 * @hooked storefront_secondary_navigation - 30
			 * @hooked storefront_product_search - 40
			 * @hooked storefront_primary_navigation - 50
			 * @hooked storefront_header_cart - 60
			 */
			do_action( 'storefront_header' ); ?>
		</div>
	</header><!-- #masthead -->

	<!-- Begin MailChimp Signup Form -->
	<div id="mc_embed_signup" style="display: none; visibility: hidden;">
	<form action="//hyzershop.us10.list-manage.com/subscribe/post?u=c294e1f306a856df1d2ffaee5&amp;id=216402b312" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
	    <div id="mc_embed_signup_scroll">
		<h2>Subscribe to our mailing list</h2>
	<div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
	<div class="mc-field-group">
		<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
	</label>
		<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
	</div>
	<div class="mc-field-group">
		<label for="mce-FNAME">First Name </label>
		<input type="text" value="" name="FNAME" class="" id="mce-FNAME">
	</div>
	<div class="mc-field-group">
		<label for="mce-LNAME">Last Name </label>
		<input type="text" value="" name="LNAME" class="" id="mce-LNAME">
	</div>
		<div id="mce-responses" class="clear">
			<div class="response" id="mce-error-response" style="display:none"></div>
			<div class="response" id="mce-success-response" style="display:none"></div>
		</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
	    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_c294e1f306a856df1d2ffaee5_216402b312" tabindex="-1" value=""></div>
	    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
	    </div>
	</form>
	</div>
	<!--End mc_embed_signup-->

	<?php
	/**
	 * @hooked storefront_header_widget_region - 10
	 */
	do_action( 'storefront_before_content' ); ?>

	<div id="content" class="site-content" tabindex="-1">
		<?php if ( is_front_page() ) {
			echo do_shortcode('[metaslider id=44]');
		} ?>
		<div class="col-full">

		<?php
		/**
		 * @hooked woocommerce_breadcrumb - 10
		 */
		do_action( 'storefront_content_top' ); ?>

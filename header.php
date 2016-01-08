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
<script type="text/javascript" src="/wp-content/themes/storefront-child/js/modernizr/modernizr.js"></script>

</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<?php
	do_action( 'storefront_before_header' ); ?>

	<header id="masthead" class="site-header" role="banner" <?php if ( get_header_image() != '' ) { echo 'style="background-image: url(' . esc_url( get_header_image() ) . ');"'; } ?>>
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
		<?php
		global $woocommerce;
		$cart_total = $woocommerce->cart->cart_contents_count;
		?>
		poopoo
		<img id="dynamic_basket" src="/wp-content/themes/storefront-child/images/basket-white-<?php echo ($cart_total > 0 ? $cart_total : 'empty' ); ?>.png" style="display:none; width:25px; height:37px;" width="25" height="37" />
		
	</header><!-- #masthead -->

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

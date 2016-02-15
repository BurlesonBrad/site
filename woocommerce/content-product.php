<?php
/**
 * The template for displaying product content within loops.
 *
 * Override this template by copying it to yourtheme/woocommerce/content-product.php
 *
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 2.4.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product, $woocommerce_loop;

// Store loop count we're currently on
if ( empty( $woocommerce_loop['loop'] ) ) {
	$woocommerce_loop['loop'] = 0;
}

// Store column count for displaying the grid
if ( empty( $woocommerce_loop['columns'] ) ) {
	$woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', 4 );
}

// Ensure visibility
if ( ! $product || ! $product->is_visible() ) {
	return;
}

// Increase loop count
$woocommerce_loop['loop']++;

// Extra post classes
$classes = array();
if ( 0 == ( $woocommerce_loop['loop'] - 1 ) % $woocommerce_loop['columns'] || 1 == $woocommerce_loop['columns'] ) {
	$classes[] = 'first';
}
if ( 0 == $woocommerce_loop['loop'] % $woocommerce_loop['columns'] ) {
	$classes[] = 'last';
}

$post_id = $post->ID;
$type = wp_get_post_terms( $post_id, 'disc-type' );
$type = $type[0]->slug;
$brand = wp_get_post_terms( $post_id, 'product_brand' );
$brand_name = $brand[0]->name;
$brand = $brand[0]->slug;
?>
<li data-category="<?php echo (has_category('discs', $post->ID) ? 'product-cat-discs' : ''); ?>" data-product-slug="<?php echo $post->post_name; ?>" data-disc-type="<?php echo $type; ?>" data-brand="<?php echo $brand; ?>" <?php post_class( $classes ); ?>>

	<?php do_action( 'woocommerce_before_shop_loop_item' ); ?>

	<a href="<?php the_permalink(); ?>">

		<?php
			/**
			 * woocommerce_before_shop_loop_item_title hook
			 *
			 * @hooked woocommerce_show_product_loop_sale_flash - 10
			 * @hooked woocommerce_template_loop_product_thumbnail - 10
			 */
			do_action( 'woocommerce_before_shop_loop_item_title' );
		?>

		<h4><?php echo $brand_name; ?></h4>

		<?php
			/**
			 * woocommerce_shop_loop_item_title hook
			 *
			 * @hooked woocommerce_template_loop_product_title - 10
			 */
			do_action( 'woocommerce_shop_loop_item_title' );

			/**
			 * woocommerce_after_shop_loop_item_title hook
			 *
			 * @hooked woocommerce_template_loop_rating - 5
			 * @hooked woocommerce_template_loop_price - 10
			 */
			do_action( 'woocommerce_after_shop_loop_item_title' );
		?>

	</a>

	<?php

		/**
		 * woocommerce_after_shop_loop_item hook
		 *
		 * @hooked woocommerce_template_loop_add_to_cart - 10
		 */
		do_action( 'woocommerce_after_shop_loop_item' );

	?>

	<?php if ( is_tax() )
	<div class='add-to-bag'><img class='not-yet-added' src='/wp-content/themes/storefront-child/images/plus-pink.gif' width='12' height='12' alt='Add' /><img class='added' src='/wp-content/themes/storefront-child/images/check-green.gif' width='14' height='12' alt='Add' /><span>Add<span class='added'>ed</span> to bag<span class='added'>!</span></span></div>
	<div class='remove-from-bag'><img class='not-yet-removed' src='/wp-content/themes/storefront-child/images/x-red.gif' width='12' height='12' alt='Remove' /><img class='removed' src='/wp-content/themes/storefront-child/images/check-green.gif' width='14' height='12' alt='Removed' /><span>Remove<span class='removed'>d</span> from bag</span></div>
</li>

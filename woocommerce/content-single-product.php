<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * Override this template by copying it to yourtheme/woocommerce/content-single-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>

<?php
	/**
	 * woocommerce_before_single_product hook
	 *
	 * @hooked wc_print_notices - 10
	 */
	 do_action( 'woocommerce_before_single_product' );

	 if ( post_password_required() ) {
	 	echo get_the_password_form();
	 	return;
	 }

	$type = wp_get_post_terms( $post->ID, 'disc-type' );
	$type = $type[0]->slug;
	$brand = wp_get_post_terms( $post->ID, 'product_brand' );
	$brand = $brand[0]->slug;
	$inbounds_id = get_post_meta( $post->ID, 'inbounds_id', true );
	$speed = get_post_meta( $post->ID, 'speed', true );
	$glide = get_post_meta( $post->ID, 'glide', true );
	$turn = get_post_meta( $post->ID, 'turn', true );
	$fade = get_post_meta( $post->ID, 'fade', true );
?>

<script type="text/javascript">var $discSlug = "<?php echo $post->post_name; ?>";</script>

<div data-product-slug="<?php echo $post->post_name; ?>" data-disc-type="<?php echo $type; ?>" data-brand="<?php echo $brand; ?>" data-inbounds-id="<?php echo $inbounds_id; ?>" data-speed="<?php echo $speed; ?>" data-glide="<?php echo $glide; ?>" data-turn="<?php echo $turn; ?>" data-fade="<?php echo $fade; ?>" itemtype="<?php echo woocommerce_get_product_schema(); ?>" id="product-<?php the_ID(); ?>" data-category="<?php echo (has_category('discs') ? 'product-cat-discs' : null); ?>" <?php post_class(); ?>>
	<?php
		/**
		 * woocommerce_before_single_product_summary hook
		 *
		 * @hooked woocommerce_show_product_sale_flash - 10
		 * @hooked woocommerce_show_product_images - 20
		 */
		do_action( 'woocommerce_before_single_product_summary' );
	?>

	<div class="summary entry-summary">
		<h2 class="brand"><?php echo get_brands( $post->ID, ' ' ); ?></h2>
		<?php
			/**
			 * woocommerce_single_product_summary hook
			 *
			 * @hooked woocommerce_template_single_title - 5
			 * @hooked woocommerce_template_single_rating - 10
			 * @hooked woocommerce_template_single_price - 10
			 * @hooked woocommerce_template_single_excerpt - 20
			 * @hooked woocommerce_template_single_add_to_cart - 30
			 * @hooked woocommerce_template_single_meta - 40
			 * @hooked woocommerce_template_single_sharing - 50
			 */
			do_action( 'woocommerce_single_product_summary' );
		?>
		<div class='add-to-bag'><img class='not-yet-added' src='/wp-content/themes/storefront-child/images/plus-pink.gif' width='12' height='12' alt='Add' /><img class='added' src='/wp-content/themes/storefront-child/images/check-green.gif' width='14' height='12' alt='Add' /><span>Add<span class='added'>ed</span> to bag<span class='added'>!</span></span></div>
		<div class='remove-from-bag'><img class='not-yet-removed' src='/wp-content/themes/storefront-child/images/x-red.gif' width='12' height='12' alt='Remove' /><img class='removed' src='/wp-content/themes/storefront-child/images/check-green.gif' width='14' height='12' alt='Removed' /><span>Remove<span class='removed'>d</span> from bag</span></div>
	</div><!-- .summary -->

	<?php
		/**
		 * woocommerce_after_single_product_summary hook
		 *
		 * @hooked woocommerce_output_product_data_tabs - 10
		 * @hooked woocommerce_upsell_display - 15
		 * @hooked woocommerce_output_related_products - 20
		 */
		do_action( 'woocommerce_after_single_product_summary' );
	?>

	<meta itemprop="url" content="<?php the_permalink(); ?>" />

</div><!-- #product-<?php the_ID(); ?> -->

<?php do_action( 'woocommerce_after_single_product' ); ?>

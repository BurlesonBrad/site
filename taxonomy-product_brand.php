<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive.
 *
 * Override this template by copying it to yourtheme/woocommerce/archive-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

	<?php
		/**
		 * woocommerce_before_main_content hook
		 *
		 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
		 * @hooked woocommerce_breadcrumb - 20
		 */
		do_action( 'woocommerce_before_main_content' );
	?>

		<?php if ( apply_filters( 'woocommerce_show_page_title', true ) ) : ?>

			<h1 class="page-title"><?php woocommerce_page_title(); ?></h1>

		<?php endif; ?>

		<?php
			/**
			 * woocommerce_archive_description hook
			 *
			 * @hooked woocommerce_taxonomy_archive_description - 10
			 * @hooked woocommerce_product_archive_description - 10
			 */
			do_action( 'woocommerce_archive_description' );
			echo term_description();
			$brand_id = get_queried_object()->term_id;
		?>

		<?php if ( have_posts() ) : ?>

			<h2 class="brand-disc-type-title">Distance Drivers</h2>
			<ul class="products brand-disc-type distance-drivers">
			<?php
				$dd_args = array(
					'post_type' => 'product',
					'tax_query' => array(
				        array(
					        'taxonomy' 	=> 'disc-type',
					        'field' 	=> 'slug',
					        'terms' 	=> 'distance-drivers',
				        ),
				        array(
					        'taxonomy' 	=> 'product_brand',
					        'field' 	=> 'id',
					        'terms' 	=> $brand_id,
				        )
				    )
				);
				$loop = new WP_Query( $dd_args );
				if ( $loop->have_posts() ) {
					while ( $loop->have_posts() ) : $loop->the_post();
						wc_get_template_part( 'content', 'product' );
					endwhile;
				} else {
					echo __( 'No products found' );
				}
				wp_reset_postdata();
			?>
			</ul><!--/.products-->

			<h2 class="brand-disc-type-title">Fairway Drivers</h2>
			<ul class="products brand-disc-type fairway-drivers">
			<?php
				$cd_args = array(
					'post_type' => 'product',
					'tax_query' => array(
				        array(
					        'taxonomy' 	=> 'disc-type',
					        'field' 	=> 'slug',
					        'terms' 	=> 'fairway-drivers',
				        ),
				        array(
					        'taxonomy' 	=> 'product_brand',
					        'field' 	=> 'id',
					        'terms' 	=> $brand_id,
				        )
				    )
				);
				$loop = new WP_Query( $cd_args );
				if ( $loop->have_posts() ) {
					while ( $loop->have_posts() ) : $loop->the_post();
						wc_get_template_part( 'content', 'product' );
					endwhile;
				} else {
					echo __( 'No products found' );
				}
				wp_reset_postdata();
			?>
			</ul><!--/.products-->

			<h2 class="brand-disc-type-title">Mid-ranges</h2>
			<ul class="products brand-disc-type midranges">
			<?php
				$mr_args = array(
					'post_type' => 'product',
					'tax_query' => array(
				        array(
					        'taxonomy' 	=> 'disc-type',
					        'field' 	=> 'slug',
					        'terms' 	=> 'midranges',
				        ),
				        array(
					        'taxonomy' 	=> 'product_brand',
					        'field' 	=> 'id',
					        'terms' 	=> $brand_id,
				        )
				    )
				);
				$loop = new WP_Query( $mr_args );
				if ( $loop->have_posts() ) {
					while ( $loop->have_posts() ) : $loop->the_post();
						wc_get_template_part( 'content', 'product' );
					endwhile;
				} else {
					echo __( 'No products found' );
				}
				wp_reset_postdata();
			?>
			</ul><!--/.products-->

			<h2 class="brand-disc-type-title">Putters</h2>
			<ul class="products brand-disc-type putters">
			<?php
				$p_args = array(
					'post_type' => 'product',
					'tax_query' => array(
				        array(
					        'taxonomy' 	=> 'disc-type',
					        'field' 	=> 'slug',
					        'terms' 	=> 'putters',
				        ),
				        array(
					        'taxonomy' 	=> 'product_brand',
					        'field' 	=> 'id',
					        'terms' 	=> $brand_id,
				        )
				    )
				);
				$loop = new WP_Query( $p_args );
				if ( $loop->have_posts() ) {
					while ( $loop->have_posts() ) : $loop->the_post();
						wc_get_template_part( 'content', 'product' );
					endwhile;
				} else {
					echo __( 'No products found' );
				}
				wp_reset_postdata();
			?>
			</ul><!--/.products-->

		<?php elseif ( ! woocommerce_product_subcategories( array( 'before' => woocommerce_product_loop_start( false ), 'after' => woocommerce_product_loop_end( false ) ) ) ) : ?>

			<?php wc_get_template( 'loop/no-products-found.php' ); ?>

		<?php endif; ?>

	<?php
		/**
		 * woocommerce_after_main_content hook
		 *
		 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
		 */
		//	do_action( 'woocommerce_after_main_content' );
	?>

	<?php
		/**
		 * woocommerce_sidebar hook
		 *
		 * @hooked woocommerce_get_sidebar - 10
		 */
		//	do_action( 'woocommerce_sidebar' );
	?>

<?php get_footer( 'shop' ); ?>

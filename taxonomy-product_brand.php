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
			//	do_action( 'woocommerce_archive_description' );

			echo '<div class="hs-brand-description">' . term_description() . '</div>';
			$brand_id = get_queried_object()->term_id;
		?>

		<?php $hs_disc_brand = get_queried_object()->slug; ?>

		<?php if ( have_posts() ) : ?>

		<?php
			$disc_types = get_terms( 'disc-type', array( 'orderby' => 'term_id', 'hide_empty' => 1 ) );
			foreach ( $disc_types as $type ): ?>
				<?php $type_description_meta = 'brand_' . $type->slug . '_description'; ?>
				<h2 data-brand="<?php echo $hs_disc_brand; ?>" class="brand-disc-type-title <?php echo $type->slug; ?>-title"><?php echo $type->name; ?></h2>
				<p><?php echo $brand_id . 'product_brand_$brand_id' . get_field( $type_description_meta, 'product_brand' . (string)$brand_id ); ?></p>
				<ul class="products brand-disc-type <?php echo $type->slug; ?>-products">

				<?php
					$query_args = array(
						'post_type' => 'product',
						'tax_query' => array(
					        array(
						        'taxonomy' 	=> 'disc-type',
						        'field' 	=> 'slug',
						        'terms' 	=> $type->slug,
					        ),
					        array(
						        'taxonomy' 	=> 'product_brand',
						        'field' 	=> 'id',
						        'terms' 	=> $brand_id,
					        )
					    )
					);
					$loop = new WP_Query( $query_args );
					if ( $loop->have_posts() ) {
						while ( $loop->have_posts() ) : $loop->the_post();
							wc_get_template_part( 'content', 'product' );
						endwhile;
					} else {
						echo '<style>.' . $type->slug . '-title, .' . $type->slug . '-products { display: none; }</style>';
					}
					wp_reset_postdata();
				?>
				</ul><!--/.products-->
			<?php endforeach; ?>

			<h2 class="other-stuff-title">Other Stuff</h2>
			<ul class="products brand-disc-type putters">
			<?php
				$p_args = array(
					'post_type' => 'product',
					'tax_query' => array(
				        array(
					        'taxonomy' 	=> 'disc-type',
					        'field' 	=> 'slug',
					        'terms' 	=> array( 'distance-drivers', 'fairway-drivers', 'midranges', 'putters' ),
					        'operator'	=> 'NOT IN',
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
					echo '<style>.other-stuff-title, .other-stuff-products { display: none; }</style>';
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
		do_action( 'woocommerce_after_main_content' );
	?>

	<?php
		/**
		 * woocommerce_sidebar hook
		 *
		 * @hooked woocommerce_get_sidebar - 10
		 */
		do_action( 'woocommerce_sidebar' );
	?>

<?php get_footer( 'shop' ); ?>

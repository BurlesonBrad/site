<?php
/**
 * The template for displaying the homepage.
 *
 * This page template will display any functions hooked into the `homepage` action.
 * By default this includes a variety of product displays and the page content itself. To change the order or toggle these components
 * use the Homepage Control plugin.
 * https://wordpress.org/plugins/homepage-control/
 *
 * Template name: Homepage
 *
 * @package storefront
 */

get_header(); ?>

	<style> main > article > .entry-header { display:none; } </style>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
		
			<div class="featured-disc-area">
				<?php
				$fd_args = array(
					'post_type'		=> 'product',
					'numberposts' 	=> 1,
					'category_name' => 'featured-disc',
					'orderby' 		=> 'date'
				);
				$featured_disc = get_posts($fd_args);
				foreach ( $featured_disc as $post ) : setup_postdata( $post ); ?>
					<h2><?php the_title(); ?></h2>
					<p><?php the_excerpt(); ?></p>
				<?php endforeach; 
				wp_reset_postdata();
				?>
			</div>

			<?php
			/**
			 * @hooked storefront_homepage_content - 10
			 * @hooked storefront_product_categories - 20
			 * @hooked storefront_recent_products - 30
			 * @hooked storefront_featured_products - 40
			 * @hooked storefront_popular_products - 50
			 * @hooked storefront_on_sale_products - 60
			 */
			do_action( 'homepage' ); ?>
			
			<div class="weekly-tip">
				<?php
				$wt_args = array(
					'numberposts' 	=> 1,
					'category_name' => 'weekly-tip',
					'orderby' 		=> 'date'
				);
				$weekly_tip = get_posts($wt_args);
				foreach ( $weekly_tip as $post ) : setup_postdata( $post ); ?>
					<h2><?php the_title(); ?></h2>
					<p><?php the_excerpt(); ?></p>
				<?php endforeach; 
				wp_reset_postdata();
				?>
			</div>

		</main><!-- #main -->
	</div><!-- #primary -->
<?php get_footer(); ?>

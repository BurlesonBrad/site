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
		
			<section class="featured-disc-area">
				<div class="featured-disc-text">
					<?php
					$fd_params = array(
						'posts_per_page' => 1,
						'product_cat' => 'featured-disc',
						'post_type' => 'product'
					);
					$wc_query = new WP_Query($fd_params);
				
					if ( $wc_query->have_posts() ) :
						while ( $wc_query->have_posts() ) :
							$wc_query->the_post(); ?>
					<p class="featured-disc-pre">This month's disc</p>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p><?php the_excerpt(); ?></p>
					<a href="<?php the_permalink(); ?>"><button>Learn more</button></a>
				</div>
				<div class="featured-disc-image">
					<?php
						the_post_thumbnail();
						
						endwhile;
						wp_reset_postdata();
					endif; ?>
				</div>
				<div class="featured-disc-twitter twitter-feed">
					<a class="twitter-timeline" href="https://twitter.com/search?q=%40discraftdg" data-widget-id="680632584016162816">Tweets about @discraftdg</a>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				</div>
			</section>

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

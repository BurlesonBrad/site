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
			<section class="featured-disc-area col-full">
				<div class="featured-disc-text">
					<div class="featured-disc-inner">
						<?php
						$fd_params = array(
							'posts_per_page' => 1,
							'product_cat' => 'featured-disc',
							'post_type' => 'product'
						);
						$wc_query = new WP_Query($fd_params);
					
						if ( $wc_query->have_posts() ) :
							while ( $wc_query->have_posts() ) :
								$wc_query->the_post(); 
								$post_id = get_the_ID(); ?>
						<p class="featured-disc-pre">This month's disc</p>
						<h2><a href="<?php the_permalink(); ?>"><?php echo get_brands( $post_id ); ?> <?php the_title(); ?></a></h2>
						<?php the_excerpt(); ?>
						<a href="<?php the_permalink(); ?>"><button>Learn more</button></a>
					</div>
				</div>
				<div class="featured-disc-image">
					<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail();	?></a>
				</div>
				<div class="featured-disc-twitter twitter-feed">
					<div class="featured-disc-inner">
						<h2><span>@</span><?php echo get_brands( $post_id ); ?></h2>
						<a class="twitter-timeline" href="https://twitter.com/search?q=%40discraftdg" data-widget-id="680632584016162816">Tweets about @discraftdg</a>
						<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
					</div>
				</div>
				<?php
				endwhile;
					wp_reset_postdata();
				endif; ?>
			</section>
			<?php
				$taxonomy = array( 'disc-type' );
				$dt_args = array(
					'orderby' 	=> 'id',
					'number'	=> 4,
					'fields'	=> 'id=>slug',
				);
				$disc_types = get_terms( $taxonomy, $dt_args );
			?>
			<section class="shop-by-disc-type gradient-bg">
				<div class="disc-types-inner col-full">
				<?php
					foreach ( $disc_types as $id => $slug ) {
						$disc_type = get_term( $id, 'disc-type' );
						$disc_type_link = get_term_link( $id, 'disc-type' );
						echo '<a href="' . $disc_type_link . '"><span>' . $disc_type->name . '</span><img src="' . get_stylesheet_directory_uri() . '/images/disc-type-' . $slug . '.png" alt="' . $disc_type->name . '" /></a>';
					}
				?>
				</div>
			</section>

			<section class="shop-by-brand col-full">
				<h2 class="rocksalt blue">Shop by brand</h2> 
				<?php echo do_shortcode("[product_brand_thumbnails]"); ?>
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
			//do_action( 'homepage' ); 
			?>
			
			<section class="tired-of-shopping">
				<img src="/wp-content/themes/storefront-child/images/tired-of-shopping.png" alt="Tired of shopping?" />
				<div class="read-the-blog">
					<a href="http://blog.hyzershop.com"><img src="/wp-content/themes/storefront-child/images/read-the-blog.png" alt="Read the blog" /></a>
				</div>
				<div class="featured-video">
					<?php
					$video_args = array(
						'numberposts' 	=> 1,
						'category_name' => 'featured-video',
						'orderby' 		=> 'date'
					);
					$weekly_video = get_posts($video_args);
					foreach ( $weekly_video as $post ) : setup_postdata( $post );
						if ( has_post_video() ) {
							the_post_video();
						} else {
							the_post_thumbnail();
						}
					endforeach;
					wp_reset_postdata();
					?>
				</div>
			</section>

			<section class="weekly-tip">
				<img src="/wp-content/themes/storefront-child/images/weekly-tip-bubble.png" alt="your weekly disc golf tip" />
				<div class="weekly-tip-content">
					<?php
					$wt_args = array(
						'numberposts' 	=> 1,
						'category_name' => 'weekly-tip',
						'orderby' 		=> 'date'
					);
					$weekly_tip = get_posts($wt_args);
					foreach ( $weekly_tip as $post ) : setup_postdata( $post ); ?>
						<h3><?php the_title(); ?></h3>
						<?php the_excerpt(); ?>
					<?php endforeach;
					wp_reset_postdata();
					?>
				</div>
			</section>

		</main><!-- #main -->
	</div><!-- #primary -->
	<?php echo do_shortcode("[instagram-feed num=5 cols=5]"); ?>
<?php get_footer(); ?>

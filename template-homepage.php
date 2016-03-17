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
							while ( $wc_query->have_posts() ) : $wc_query->the_post(); 
								$post_id = get_the_ID();

								$twitter_header = get_post_meta( $post_id, 'twitter_header', true ) ?: get_brands( $post_id );
						?>
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
						<h2><span>#</span><?php echo $twitter_header; ?></h2>
						<a class="twitter-timeline" href="https://twitter.com/search?q=%40discraftdg" data-widget-id="680632584016162816">Tweets about @discraftdg</a>
						<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
					</div>
				</div>
				<?php
							endwhile;
							wp_reset_postdata();
						endif; 
				?>
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
			
			<section class="tired-of-shopping col-full">
				<img src="/wp-content/themes/storefront-child/images/tired-of-shopping.png" alt="Tired of shopping?" />
				<div class="read-the-blog">
					<script type="text/javascript">
						var getFeaturedBlogPost = function () {
							$.get( "http://www.your-web-site.com/wp-json/wp/v2/posts/{id}" )
						};
						$(document).ready(function() {
							console.log( getFeaturedBlogPost() );
						});
					</script>
					<a href="http://blog.hyzershop.com" target="_blank"><img src="/wp-content/themes/storefront-child/images/read-the-blog.png" alt="Read the blog" /></a>
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

			<section class="weekly-tip col-full">
				<img src="/wp-content/themes/storefront-child/images/weekly-tip.png" alt="your weekly disc golf tip" />
				<div class="weekly-tip-content">
					<?php
					$wt_args = array(
						'numberposts' 	=> 1,
						'category_name' => 'weekly-tip',
						'orderby' 		=> 'date'
					);
					$weekly_tip = get_posts($wt_args);
					foreach ( $weekly_tip as $post ) : setup_postdata( $post ); ?>
						<h3 class="pink"><?php the_title(); ?></h3>
						<?php the_excerpt(); ?>
					<?php endforeach;
					wp_reset_postdata();
					?>
				</div>
			</section>

			<section class="social-bar col-full">
				<ul>
					<li><a href="http://instagram.com/hyzershop" target="_blank"><img src="/wp-content/themes/storefront-child/images/instagram-circle-blue.png" alt="follow us on Instagram" /></a></li>
					<li><a href="http://facebook.com/hyzershop" target="_blank"><img src="/wp-content/themes/storefront-child/images/facebook-circle-blue.png" alt="like us on Facebook" /></a></li>
					<li><a href="http://twitter.com/hyzer_shop" target="_blank"><img src="/wp-content/themes/storefront-child/images/twitter-circle-blue.png" alt="follow us on Twitter" /></a></li>
					<li id="mc_embed_signup" class="email-bar">
						<!-- Begin MailChimp Signup Form -->
						<form action="//hyzershop.us10.list-manage.com/subscribe/post?u=c294e1f306a856df1d2ffaee5&amp;id=216402b312" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
						    <div id="mc_embed_signup_scroll">
							<label for="mce-EMAIL"><img src="/wp-content/themes/storefront-child/images/mail-icon-white.png" alt="get cool stuff in your inbox"/></label>
							<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="get cool stuff in your inbox" required>
						    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
						    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_c294e1f306a856df1d2ffaee5_216402b312" tabindex="-1" value=""></div>
						    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
						    </div>
						</form>
						<!--End mc_embed_signup-->
					</li>
				</ul>
			</section>

		</main><!-- #main -->
	</div><!-- #primary -->
	<?php echo do_shortcode("[instagram-feed num=5 cols=5]"); ?>
<?php get_footer(); ?>

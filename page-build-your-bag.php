<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package storefront
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

 			<?php // while ( have_posts() ) : the_post(); ?>

				<?php
				// do_action( 'storefront_page_before' );
				?>

				<?php // get_template_part( 'content', 'page' ); ?>

				<?php
				/**
				 * @hooked storefront_display_comments - 10
				 */
				// do_action( 'storefront_page_after' );
				?>

			<?php // endwhile; // end of the loop. ?>

			<div id="byb-wrapper" data-temp-user="0">
				<div id="bags">
					<?php
					function getDiscBags() {
						$byb_cookie = $_COOKIE['byb'];

						if ( isset($byb_cookie) ) {
							$bags = json_decode( $byb_cookie, true );
							echo $bags;
							foreach ( $bags as $bag ):
								$bag_slug = str_replace( " ", "-", $bag["name"] );
								$bag_slug = strtolower( $bag_slug );
								$discs = $bag["discs"];

								echo '<div class="bag bag-' . $bag_slug . '"><h2>' . $bag["name"] . '</h2>';
								
								// Drivers
								echo '<div class="drivers"><h3>Drivers</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "distance driver" || $disc['type'] === "fairway driver" ) {
										echo '<div class="disc"><a href="/product/' . $disc["slug"] . '"><img src="/wp-content/uploads/' . $disc["slug"] . '.png" alt="' . $disc["name"] . '" /></a></div>';
							    	}
							    endforeach;
							    echo '</div></div>';

							    // Mid-ranges
								echo '<div class="midranges"><h3>Mid-ranges</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "midrange" ) {
										echo '<div class="disc"><a href="/product/' . $disc["slug"] . '"><img src="/wp-content/uploads/' . $disc["slug"] . '.png" alt="' . $disc["name"] . '" /></a></div>';
							    	}
							    endforeach;
							    echo '</div></div>';

								// Putters
								echo '<div class="putters"><h3>Putters</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "putter" ) {
										echo '<div class="disc"><a href="/product/' . $disc["slug"] . '"><img src="/wp-content/uploads/' . $disc["slug"] . '.png" alt="' . $disc["name"] . '" /></a></div>';
							    	}
							    endforeach;
							    echo '</div></div>';

							endforeach;
						} else {
							echo '<div class="add-first-bag"><img src="' . get_stylesheet_directory_uri() . '/images/add-first-bag.png" alt="start building your bag" /></div>';
						}
					}
					getDiscBags();
				?>

				<!-- <form id="byb-form">
					<input type="text" name="bag_name" id="bag_name">
					<input type="submit" value="save">
				</form> -->
				
				</div>
				<button id="clear_bags">Clear All</button>
			</div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php do_action( 'storefront_sidebar' ); ?>

<?php get_footer(); ?>

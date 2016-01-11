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

	<div id="primary" class="content-area build-your-bag">
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
						$byb_json = stripslashes($byb_cookie);
						$byb_array = json_decode( $byb_json, true );

						if ( isset($byb_cookie) ) {
							$bags = $byb_array;
							
							foreach ( $bags as $bag ):
								$bag_slug = str_replace( " ", "-", $bag["name"] );
								$bag_slug = strtolower( $bag_slug );
								$discs = $bag["discs"];
								$edit_btn = '<div class="bag-edit-btn"><img class="edit-icon" src="' . get_stylesheet_directory_uri() . '/images/edit-icon-blue.png" alt="Edit bag name" /><span>Change your bag\'s name</span></div>';
								$dd_count = 0;
								$fd_count = 0;
								$mr_count = 0;
								$p_count = 0;

								echo '<div class="bag bag-' . $bag_slug . '"><div class="bag-title"><form action="' . $_SERVER['PHP_SELF'] . '" method="post" name="edit-bag-name" class="edit-bag-name"><input type="text" value="' . $bag["name"] . '"><input type="submit" style="display:none;"></form><h2>' . $bag["name"] . '</h2>' . $edit_btn . '</div>';
								
								// Drivers
								echo '<div class="distance-drivers"><h3>Distance Drivers</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "distance-driver" ) {
										$dd_count++;
										echo '<div class="disc"><a href="/product/' . $disc["slug"] . '"><img src="/wp-content/uploads/' . $disc["slug"] . '-300x300.png" alt="' . $disc["name"] . '" /></a></div>';
							    	}
							    endforeach;
							    echo '</div></div>';
							    if ( $dd_count === 0 ) {
							    	echo '<style>.distance-drivers{display:none;}</style>';
							    }

							    // Fairway
								echo '<div class="fairway-drivers"><h3>Fairway Drivers</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "fairway-driver" ) {
										$fd_count++;
										echo '<div class="disc"><a href="/product/' . $disc["slug"] . '"><img src="/wp-content/uploads/' . $disc["slug"] . '-300x300.png" alt="' . $disc["name"] . '" /></a></div>';
							    	}
							    endforeach;
							    echo '</div></div>';
							    if ( $fd_count === 0 ) {
							    	echo '<style>.fairway-drivers{display:none;}</style>';
							    }

							    // Mid-ranges
								echo '<div class="midranges"><h3>Mid-ranges</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "midrange" ) {
										$mr_count++;
										echo '<div class="disc"><a href="/product/' . $disc["slug"] . '"><img src="/wp-content/uploads/' . $disc["slug"] . '-300x300.png" alt="' . $disc["name"] . '" /></a></div>';
							    	}
							    endforeach;
							    echo '</div></div>';
							    if ( $mr_count === 0 ) {
							    	echo '<style>.midranges{display:none;}</style>';
							    }

								// Putters
								echo '<div class="putters"><h3>Putters</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "putter" ) {
										$p_count++;
										echo '<div class="disc"><a href="/product/' . $disc["slug"] . '"><img src="/wp-content/uploads/' . $disc["slug"] . '-300x300.png" alt="' . $disc["name"] . '" /></a></div>';
							    	}
							    endforeach;							    
							    echo '</div></div>';
							    if ( $p_count === 0 ) {
							    	echo '<style>.putters{display:none;}</style>';
							    }

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

<?php 
//	do_action( 'storefront_sidebar' );
?>

<?php get_footer(); ?>

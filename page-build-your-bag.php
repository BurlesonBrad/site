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

 		<?php
 		function get_disc($s, $part) {
			$args = array(
			  'name'        => $s,
			  'post_type'   => 'product',
			  'post_status' => 'publish',
			  'numberposts' => 1
			);
			$products = get_posts($args);
			$product = $products[0];
			if( $products ) :
				if ( $part === 'thumbnail' ) {
					return get_the_post_thumbnail( $product->ID, 'medium' );
				}
				if ( $part === 'slug' ) {
					return $product->post_name;
				}
				if ( $part === 'link' ) {
					return get_post_permalink( $product->ID );
				}
			endif;
			wp_reset_postdata();
		}
		?>

			<div id="byb-wrapper" data-temp-user="0">
				<div id="bags">
					<?php
					function getDiscBags() {
						if ( is_user_logged_in() ) {
							// if they already have a logged-in bag
							$byb_cookie = $_COOKIE['byb'];
							if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
								echo '<h1>yahoo!</h1>';
								if ( isset($_POST['byb']) && $_POST['byb'] != 'undefined' ) {
									$byb = $_POST['byb'];
								}
							} else {
								// if they don't have a logged-in bag, but have a cookie bag
								if ( isset( $_COOKIE['byb'] ) ) {
									$byb = $_COOKIE['byb'];
								} else { // if they ain't got no bag nohow
									$byb = false;
								}
							}
						} else {
							if ( isset( $_COOKIE['byb'] ) ) {
								$byb = $_COOKIE['byb'];
							} else { // if they ain't got no bag nohow
								$byb = false;
							}
						}

						// if ( is_user_logged_in() ) {
						// 	$user = wp_get_current_user();
						// 	$user_id = $user->ID;
						// 	$byb = get_user_meta($user_id, 'byb', true);
						// 	$byb_cookie = $_COOKIE['byb'];
						// 	if ( isset($byb_cookie) ) {
						// 		// UPDATE user meta with the cookie
						// 		$byb_json = stripslashes($byb_cookie);
						// 		update_user_meta($user_id, 'byb', $byb_json);
						// 	} else {
						// 		// taken care of by set_byb_cookie() in functions.php
						// 	}
						// 	if ( !isset($byb) ) {
						// 		$byb = $byb_cookie;
						// 	}
						// } else {
						// 	$byb = $_COOKIE['byb'];
						// }

						if ( $byb ) {
							$byb_json = stripslashes($byb);
							$byb_array = json_decode( $byb_json, true );
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

								function the_disc($d) {
									$slug = $d["slug"];
									echo '<div class="disc product ' . get_disc( $slug, 'slug' ) . '" data-product-slug="' . get_disc( $slug, 'slug' ) . '"><a href="' . get_disc( $slug, 'link' ) . '">' . get_disc( $slug, 'thumbnail' ) . '</a></div>';
								}

								echo '<div class="bag bag-' . $bag_slug . '" data-bag-name="' . $bag["name"] . '"><div class="bag-title"><form action="' . $_SERVER['PHP_SELF'] . '" method="post" name="edit-bag-name" class="edit-bag-name"><input type="text" value="' . $bag["name"] . '"><input type="submit" style="display:none;"></form><h2>' . $bag["name"] . '</h2>' . $edit_btn . '</div>';
								
								// Drivers
								echo '<div class="distance-drivers"><h3>Distance Drivers</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "distance-driver" ) {
										$dd_count++;
										the_disc( $disc );
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
										the_disc( $disc );
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
										the_disc( $disc );
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
										the_disc( $disc );
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

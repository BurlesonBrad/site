<?php

if ( $_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['byb']) ) {
	if ( is_user_logged_in() ) {
		$user = wp_get_current_user();
		$user_id = $user->ID;
		echo get_user_meta($user_id, 'byb', true);
	} elseif ( $_COOKIE['byb'] ) {
		echo $_COOKIE['byb'];
	}
	return;
}

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
 		// if ( $_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['bags']) ) {
 		// 	$byb_json = $_POST['bags'];
 		// 	$user = wp_get_current_user();
			// $user_id = $user->ID;
 		// 	if ( $byb_json === '' ) {
 		// 		delete_user_meta($user_id, 'byb', $byb_json);
 		// 	} else {
 		// 		update_user_meta($user_id, 'byb', $byb_json);
 		// 	}
 		// }

 		if ( isset($_COOKIE['byb']) ):
 			$byb = $_COOKIE['byb'];
 		else: 
 			$byb = false;
 		endif;

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

		// function isJson($string) {
		// 	json_decode($string);
		// 	return (json_last_error() == JSON_ERROR_NONE);
		// }
		?>

			<div id="byb-wrapper" data-temp-user="0">
				<div id="bags">
					<?php
					function getDiscBags($byb) {
						// if ( is_user_logged_in() ) {
						// 	$user = wp_get_current_user();
						// 	$user_id = $user->ID;
						// 	$byb = get_user_meta($user_id, 'byb', true);
						// 	if ( !$byb ) {
						// 		$byb = $_COOKIE['byb'];
						// 	}
						// }

						if ( $byb ) {
							if ( is_string($byb) ) {
								$byb_json = stripslashes($byb);
								$byb_array = json_decode( $byb_json, true );
								$bags = $byb_array;
							} else {
								$bags = $byb;
							}

							foreach ( $bags as $bag ):
								$bag_slug = str_replace( " ", "-", $bag["name"] );
								$bag_slug = strtolower( $bag_slug );
								$discs = $bag["discs"];
								$edit_btn = '<div class="options"><button class="options-btn">&middot;&middot;&middot;</button><ul><li class="edit-name-btn">Rename your bag</li><li id="clear-bags">Clear bags (start over)</li></ul></div>';
								$dd_count = 0;
								$fd_count = 0;
								$mr_count = 0;
								$p_count = 0;

								function the_disc($d) {
									$slug = $d["slug"];
									echo '<div class="disc product ' . get_disc( $slug, 'slug' ) . '" data-product-slug="' . get_disc( $slug, 'slug' ) . '"><a href="' . get_disc( $slug, 'link' ) . '">' . get_disc( $slug, 'thumbnail' ) . '</a><img class="remove-from-bag" src="' . get_stylesheet_directory_uri() . '/images/trash-icon.gif" alt="remove" /></div>';
								}

								echo '<div class="bag bag-' . $bag_slug . '" data-bag-name="' . $bag["name"] . '"><div class="bag-title"><form action="' . $_SERVER['PHP_SELF'] . '" method="post" name="edit-bag-name" class="edit-bag-name"><input type="text" value="' . $bag["name"] . '"><input type="submit" style="display:none;"></form><h2>' . $bag["name"] . '</h2></div>';
								
								// Drivers
								echo '<div class="bag-section distance-drivers"><h3>Distance Drivers</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "distance-drivers" ) {
										$dd_count++;
										the_disc( $disc );
							    	}
							    endforeach;
							    echo '</div></div>';
							    if ( $dd_count === 0 ) {
							    	echo '<style>.distance-drivers{display:none;}</style>';
							    }

							    // Fairway
								echo '<div class="bag-section fairway-drivers"><h3>Fairway Drivers</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "fairway-drivers" ) {
										$fd_count++;
										the_disc( $disc );
							    	}
							    endforeach;
							    echo '</div></div>';
							    if ( $fd_count === 0 ) {
							    	echo '<style>.fairway-drivers{display:none;}</style>';
							    }

							    // Mid-ranges
								echo '<div class="bag-section midranges"><h3>Mid-ranges</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "midranges" ) {
										$mr_count++;
										the_disc( $disc );
							    	}
							    endforeach;
							    echo '</div></div>';
							    if ( $mr_count === 0 ) {
							    	echo '<style>.midranges{display:none;}</style>';
							    }

								// Putters
								echo '<div class="bag-section putters"><h3>Putters</h3><div class="disc-area">';
								foreach ( $discs as $disc ):
									if ( $disc['type'] === "putters" ) {
										$p_count++;
										the_disc( $disc );
							    	}
							    endforeach;							    
							    echo '</div></div>';
							    if ( $p_count === 0 ) {
							    	echo '<style>.putters{display:none;}</style>';
							    }

							    echo $edit_btn . '</div>';

							endforeach;
						} else {
							echo '<div class="add-first-bag"><img src="' . get_stylesheet_directory_uri() . '/images/add-first-bag.png" alt="start building your bag" /></div>';
						}
					}
					getDiscBags($byb);

				?>

				<!-- <form id="byb-form">
					<input type="text" name="bag_name" id="bag_name">
					<input type="submit" value="save">
				</form> -->
				
				</div>

				<h2 class="handwritten">A few to get you going</h2>
				<?php echo do_shortcode('[product_category category="recommended-for-bag"]'); ?>

			</div>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
//	do_action( 'storefront_sidebar' );
?>

<?php get_footer(); ?>

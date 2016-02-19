<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_parent_css' ) ):
    function chld_thm_cfg_parent_css() {
        wp_enqueue_style( 'chld_thm_cfg_parent', trailingslashit( get_template_directory_uri() ) . 'style.css' );
    }
endif;
add_action( 'wp_enqueue_scripts', 'chld_thm_cfg_parent_css' );

// END ENQUEUE PARENT ACTION

add_action( 'init', 'jk_remove_storefront_header_search' );
function jk_remove_storefront_header_search() {
	remove_action( 'storefront_header', 'storefront_product_search', 40 );
}

function hyzershop_scripts() {
	wp_enqueue_script( 'custom-scripts', get_stylesheet_directory_uri() . '/js/scripts.js', array( 'jquery' ), '0.1', true );

	wp_enqueue_script( 'byb-scripts', get_stylesheet_directory_uri() . '/byb/byb.js', array( 'jquery' ), '0.1', true );

	wp_enqueue_script( 'js-cookie', get_stylesheet_directory_uri() . '/byb/js.cookie.js', array() );

	wp_enqueue_script( 'gsap', get_stylesheet_directory_uri() . '/js/gs/TweenMax.min.js', array() );
}
add_action( 'wp_enqueue_scripts', 'hyzershop_scripts' );

function dynamic_basket() {
	global $woocommerce;
	$cart_total = $woocommerce->cart->cart_contents_count;
	return $cart_total;
}
add_action( 'storefront_before_header', 'dynamic_basket', 10, 0 );

function set_disc_flight_data() {
	global $post;
	global $product;
	$args = array( 'post_type' => 'product', 'product_cat' => 'discs' );
	$discs = new WP_Query( $args );

	$inbounds_ids_json = file_get_contents( get_stylesheet_directory_uri() . '/flight-ratings/inbounds-id-list.json' );
	$inbounds_ids_json = stripslashes($inbounds_ids_json);
	$inbounds_ids_arr = json_decode( $inbounds_ids_json, true );

	$flight_ratings_json = file_get_contents( get_stylesheet_directory_uri() . '/flight-ratings/flight-ratings.json' );
	$flight_ratings_json = stripslashes($flight_ratings_json);
	$flight_ratings_arr = json_decode( $flight_ratings_json, true );

	while ( $discs->have_posts() ) : $discs->the_post();
		$post_id = $post->ID;
		$post_slug = $post->post_name;
		$inbounds_id = $inbounds_ids_arr[$post_slug];
		$fr = $flight_ratings_arr[$post_slug];

		if ( is_array($fr) ) {
			foreach ($fr as $key => $val) {
				$val = intval($val);
				$val = round($val);
				$val = strval($val);
				$fr[$key] = $val;
			}
		}
		
		$disc_speed = $fr["speed"];
		$disc_glide = $fr["glide"];
		$disc_turn = $fr["turn"];
		$disc_fade = $fr["fade"];

		$stability = intval($disc_fade) + intval($disc_turn);
//		echo $stability . '<br>';

		if ( $stability < 3 && $stability > 0 ) {
			$stability = 'Stable';
		} elseif ( $stability >= 3 ) {
			$stability = 'Overstable';
		} elseif ( $stability <= 0 ) {
			$stability = 'Understable';
		}

		echo $stability . '<br>';

		wp_set_object_terms( $post_id, $stability, 'pa_stability', false );
		// wp_remove_object_terms( $post_id, 'Stable', 'pa_stability' );
		// wp_remove_object_terms( $post_id, 'Understable', 'pa_stability' );
		// wp_remove_object_terms( $post_id, 'Overstable', 'pa_stability' );

		update_post_meta( $post_id, 'inbounds_id', $inbounds_id );
		update_post_meta( $post_id, 'speed', $disc_speed );
		update_post_meta( $post_id, 'glide', $disc_glide );
		update_post_meta( $post_id, 'turn', $disc_turn );
		update_post_meta( $post_id, 'fade', $disc_fade );
	endwhile;
}
add_action( 'wp_loaded', 'set_disc_flight_data' );

function remove_sidebar_single_product() {
	if ( is_product() ) {
		remove_action( 'storefront_sidebar', 'storefront_get_sidebar' );
	}
}
add_action( 'storefront_before_header', 'remove_sidebar_single_product', 10, 0 );

add_action( 'init', 'custom_remove_footer_credit', 10 );
function custom_remove_footer_credit () {
    remove_action( 'storefront_footer', 'storefront_credit', 20 );
    add_action( 'storefront_footer', 'custom_storefront_credit', 20 );
}
function custom_storefront_credit() {
	?>
	<div class="site-info">
		&copy; <?php echo get_bloginfo( 'name' ) . ' ' . get_the_date( 'Y' ); ?>
	</div><!-- .site-info -->
	<?php
}

add_filter( 'woocommerce_product_tabs', 'woo_remove_product_tabs', 98 );
function woo_remove_product_tabs( $tabs ) {
    unset( $tabs['additional_information'] );  	// Remove the additional information tab
    return $tabs;
}

function loop_columns() {
return 4; // 4 products per row
}
add_filter('loop_shop_columns', 'loop_columns', 999);


// function the_meta() {
// 	global $id;

// 	if ( $keys = get_post_custom_keys() ) {
// 		foreach ( $keys as $key ) {
// 			$keyt = trim($key);
// 			if ( '_' == $keyt{0} )
// 				continue;
// 			echo "<ul class='post-meta'>\n";
// 			$values = array_map('trim', get_post_custom_values($key));
// 			$value = implode($values,', ');
// 			echo "<li><span class='post-meta-key'>$key:</span> $value</li>\n";
// 			echo "</ul>\n";
// 		}
// 	}
// }

function hs_add_specs_tab() {
	global $post;
	// $product_cats = get_the_terms($post->ID, 'product_cat');
	// $cats_list = '';
	// foreach( $product_cats as $cat ) { 
	// 	$cats_list .= $cat->name;
	// }
	// $is_disc = strpos( $cats_list, 'Disc' );

	// if ( $is_disc ) {
	add_filter( 'woocommerce_product_tabs', 'woo_new_product_tab' );
	// }
}
add_action('wp_loaded', 'hs_add_specs_tab');
function woo_new_product_tab( $tabs ) {
	
	// Adds the new tab
	$tabs['specs_tab'] = array(
		'title' 	=> __( 'Specs', 'woocommerce' ),
		'priority' 	=> 1,
		'callback' 	=> 'woo_new_product_tab_content'
	);

	return $tabs;

}
function woo_new_product_tab_content() {
	global $post;
	global $product;
	$stability = '';
	$disc_type = '';
	$stability = get_the_terms($post->ID, 'pa_stability');
	$product_cats = get_the_terms($post->ID, 'product_cat');
	$cats_list = '';
	foreach( $product_cats as $cat ) { 
		$cats_list .= $cat->name;
	}
	$is_disc = strpos( $cats_list, 'Disc' );
	if ( $is_disc !== false ) {
		if ( count($stability) > 0 ) {
			$stability = '<li>Stability: <strong>' . $stability[0]->name . '</strong></li>';
		}
		
		$disc_type = get_the_terms($post->ID, 'disc-type');
		if ( count($disc_type) > 0 ) {
			$disc_type = '<li>Type: <strong>' . preg_replace('/s(?!.*s)/', '', $disc_type[0]->name) . '</strong></li>';
		}
		// The new tab content
		echo '<div class="specs"><h2>Specs</h2>';
		echo '<ul>' . $stability . $disc_type . '</ul></div>';
	}
}



// function woo_related_products_limit() {
// 	global $product;
	
// 	$args['posts_per_page'] = 5;
// 	return $args;
// }
// add_filter( 'woocommerce_output_related_products_args', 'jk_related_products_args' );
// function jk_related_products_args( $args ) {
// 	$args['posts_per_page'] = 5; // 4 related products
// 	$args['columns'] = 5; // arranged in 2 columns
// 	return $args;
// }



// if ( is_page_template( 'taxonomy-product_brand.php' ) ) {
// 	remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10 );
// }

// function set_byb_cookie() {
// 	if ( is_user_logged_in() ) {
// 		$user = wp_get_current_user();
// 		$user_id = $user->ID;
// 		$byb = get_user_meta($user_id, 'byb', true);
// 		$byb_cookie = $_COOKIE['byb'];
// 		if ( isset($byb_cookie) && $byb_cookie != 'undefined' ) {
// 			// UPDATE user meta with the cookie
// 			$byb_json = stripslashes($byb_cookie);
// 			update_user_meta($user_id, 'byb', $byb_json);
// 		}
// 		if ( (!isset($byb_cookie) || $byb_cookie === 'undefined') && (isset($byb) && $byb != 'undefined') ) {
// 			setcookie("byb", $byb, time()+86400000, "/", ".hyzershop.com");
// 		}
// 		else {
// 			setcookie("byb", $byb, time()-3600, "/", ".hyzershop.com");
// 		}
// 	}
// //	setcookie("byb", $byb, time() - 36000000);
// }
// add_action( 'init', 'set_byb_cookie');

// function remove_byb_cookie() {
// 	setcookie("byb", $byb, time() - 36000000, "/", ".hyzershop.com");
// }
// add_action( 'init', 'remove_byb_cookie' );

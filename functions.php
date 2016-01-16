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
}
add_action( 'wp_enqueue_scripts', 'hyzershop_scripts' );

function dynamic_basket() {
	global $woocommerce;
	$cart_total = $woocommerce->cart->cart_contents_count;
	return $cart_total;
}
add_action( 'storefront_before_header', 'dynamic_basket', 10, 0 );

function set_inbounds_meta_ids() {
	global $post;
	$args = array( 'post_type' => 'product', 'product_cat' => 'discs' );
	$discs = new WP_Query( $args );

	$inbounds_ids_json = file_get_contents( get_stylesheet_directory_uri() . '/flight-ratings/inbounds-id-list.json' );
	$inbounds_ids_json = stripslashes($inbounds_ids_json);
	$inbounds_ids_arr = json_decode( $inbounds_ids_json, true );

	while ( $discs->have_posts() ) : $discs->the_post(); 
		$post_id = $post->ID;
		$post_slug = $post->post_name;
		echo $post_slug;
		update_post_meta( $post_id, 'inbounds_id', $inbounds_ids_arr[$post_slug] );
	endwhile;

	var_dump( $inbounds_ids_arr['discraft-buzzz'] );
}
add_action( 'wp_loaded', 'set_inbounds_meta_ids' );

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

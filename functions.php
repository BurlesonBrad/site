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
	wp_enqueue_script(
		'custom-scripts',
		get_stylesheet_directory_uri() . '/js/scripts.js',
		array( 'jquery' )
	);

	wp_enqueue_script(
		'byb-scripts',
		get_stylesheet_directory_uri() . '/byb/byb.js',
		array( 'jquery' )
	);

	wp_enqueue_script(
		'js-cookie',
		get_stylesheet_directory_uri() . '/byb/js.cookie.js',
		array()
	);
}
add_action( 'wp_enqueue_scripts', 'hyzershop_scripts' );
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

		<div id="byb-wrapper" data-user="<?php echo $user_ID; ?>" data-temp-user="0">
			<form id="byb-form">
				<input type="text" name="bag_name" id="bag_name">
				<input type="submit" value="save">
			</form>
		</div>

			<?php while ( have_posts() ) : the_post(); ?>

				<?php
				do_action( 'storefront_page_before' );
				?>

				<?php get_template_part( 'content', 'page' ); ?>

				<?php
				/**
				 * @hooked storefront_display_comments - 10
				 */
				do_action( 'storefront_page_after' );
				?>

			<?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php do_action( 'storefront_sidebar' ); ?>

<script src="/wp-content/themes/twentyfifteen-child/byb/js.cookie.js"></script>
<script src="/wp-content/themes/twentyfifteen-child/byb/byb.js"></script>

<?php get_footer(); ?>

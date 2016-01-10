<?php global $product; ?>
<?php
	$type = wp_get_post_terms( $post->ID, 'disc-type' ); 
	$type = $type.slug;
?>
<li data-product-slug="<?php echo $post->post_name; ?>" data-disc-type="<?php echo $type; ?>">
	<a href="<?php echo esc_url( get_permalink( $product->id ) ); ?>" title="<?php echo esc_attr( $product->get_title() ); ?>">
		<?php echo $product->get_image(); ?>
		<span class="product-title"><?php echo $product->get_title(); ?></span>
	</a>
	<?php if ( ! empty( $show_rating ) ) echo $product->get_rating_html(); ?>
	<?php echo $product->get_price_html(); ?>
</li>
<?php

/**
 Template Name: Reviews Listing
 */

$context = Timber::get_context();
$post    = new TimberPost();
$context['post'] = $post;


$args = array(
    'post_type'              => 'reviews',
    'post_status'            => 'publish',
    'order'                  => 'ASC',
    'orderby'                => 'title',
    'posts_per_page'         => 10,
    'posts_per_archive_page' => 10,
    'nopaging'               => false,
    'paged'                  => get_query_var( 'paged' ),
    //'no_found_rows'          => false,
    //'cache_results'          => true,
    //'update_post_term_cache' => true,
    //'update_post_meta_cache' => true,
);
$query = new WP_Query( $args );

// Load acf fields
foreach ($query->posts as $k=>$post) {
    $post->acf = get_fields($post->ID);
}
$context['posts'] = $query->posts;


$review_cats = get_field_object('field_59f8f001de875');
$context['review_cats'] = $review_cats['choices'];



Timber::render('page-reviews-listing.twig', $context);
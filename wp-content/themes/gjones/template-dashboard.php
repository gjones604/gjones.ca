<?php

/**
 Template Name: Dashboard
 */

if ( is_user_logged_in() == false ){
    wp_redirect( '/register' );
    exit();
}


$context = Timber::get_context();
$post    = new TimberPost();
$context['post'] = $post;


$user = wp_get_current_user();


/*
    Load Postings of current user only.
*/
$args = array(
    'post_type'              => 'posting',
    'author'                 => $user->ID,
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
foreach ($query->posts as $posting) {
    $posting->acf = array();
    
    $posting->acf['number_of_positions'] = get_field('number_of_positions', $posting->ID);
    $posting->acf['compensation'] = get_field('compensation', $posting->ID);
    $posting->acf['description'] = get_field('description', $posting->ID);
    $posting->acf['requirements'] = get_field('requirements', $posting->ID);
    $posting->acf['selected_courses'] = get_field('selected_courses', $posting->ID);


}
$context['posts'] = $query->posts;
d($context['posts']);


Timber::render('page-dashboard.twig', $context);
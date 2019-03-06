<?php

/**
 Template Name: Homepage
 */

$context = Timber::get_context();
$post    = new TimberPost();
$context['post'] = $post;



$args = array(
    'post_type'              => 'project',
    'post_status'            => 'publish',
    'order'                  => 'ASC',
    'orderby'                => 'title',
    'posts_per_page'         => -1,
    'nopaging'               => true,
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

$context['projects'] = $query->posts;



Timber::render('page-home.twig', $context);

/*
$context['hero']['title'] = $post->custom['hero_title'];
$context['hero']['subtitle'] = $post->custom['hero_subtitle'];
$context['hero']['description'] = $post->custom['hero_description'];
$context['hero']['show_or_hide'] = $post->custom['hero_show_or_hide'];
*/

//d($context['hero']);

//$derp = 'udacity';
//get_data_from_api_or_cache($derp);



/*
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
*/




<?php

/**
 Template Name: Add Posting
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
 * Load all cached course data and add to DOM for JS filtering
 */
$providers = array(
    'canvas',
    'eduopen',
    'edx',
    'futurelearn_courses',
    'futurelearn_programs',
    'kadenze',
    'udacity'
);

$cachedData = array();

foreach($providers as $provider ){
    $context['cachedData'][$provider] = get_clean_data_from_api_or_cache($provider);
}

    


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
foreach ($query->posts as $k=>$post) {
    $post->acf = get_fields($post->ID);
}
$context['posts'] = $query->posts;



Timber::render('page-add-posting.twig', $context);
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
 * Load all cached course data and add to DOM for JS filtering
 */
$providers = array(
    'canvas',
    'futurelearn_courses',
    'kadenze',
    'udacity',
    //'edx',
    //'eduopen',
    //'futurelearn_programs',
);

$cachedData = array();

foreach($providers as $k=>$provider ){
    $cachedData[$k] = get_clean_data_from_api_or_cache($provider);
}

$context['cachedData'] = '';
foreach($cachedData as $cd){
    $context['cachedData'] .= $cd;
}

// Some string clean up to ensure proper JSON formatting.
$context['cachedData'] = str_replace('}][{', '},{', $context['cachedData']);
$context['cachedData'] = str_replace('}]{', '},{', $context['cachedData']);
$context['cachedData'] = str_replace('},"', '},{"', $context['cachedData']);
$context['cachedData'] = str_replace('}}', '}]', $context['cachedData']);

$context['cachedData'] = json_decode($context['cachedData']);


/*
    Load Postings of current user only.
*/
$args = array(
    'post_type'              => 'posting',
    'author'                 => $user->ID,
    'post_status'            => 'publish',
    'order'                  => 'DESC',
    'orderby'                => 'date',
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
    $posting->acf['selected_courses'] = explode(',', str_replace('c_', '', get_field('selected_courses', $posting->ID)));
}


$context['posts'] = $query->posts;

foreach( $context['posts'] as $posting ){

    foreach( $context['cachedData'] as $course ){
        foreach( $posting->acf['selected_courses'] as $cid ){
            if ( $course->id == $cid ){
                $posting->acf['selected_courses_data'][] = $course;
            }
        }
    }
    
}




Timber::render('page-dashboard.twig', $context);
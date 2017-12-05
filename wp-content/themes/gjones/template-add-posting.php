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
$context['cachedData'] = str_replace('##', '', $context['cachedData']);

Timber::render('page-add-posting.twig', $context);
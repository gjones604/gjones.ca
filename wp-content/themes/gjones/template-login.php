<?php

/**
 Template Name: Login
 */

if ( is_user_logged_in() == true ){
    wp_redirect( '/dashboard' );
    exit();
}


$context = Timber::get_context();
$post    = new TimberPost();
$context['post'] = $post;

/*
$context['hero']['title'] = $post->custom['hero_title'];
$context['hero']['subtitle'] = $post->custom['hero_subtitle'];
$context['hero']['description'] = $post->custom['hero_description'];
$context['hero']['show_or_hide'] = $post->custom['hero_show_or_hide'];
*/




$context['login']['action']  = !empty( $_GET['action'] ) && ($_GET['action'] == 'register' || $_GET['action'] == 'forgot' || $_GET['action'] == 'resetpass') ? $_GET['action'] : 'login';
$context['login']['success'] = !empty( $_GET['success'] );
$context['login']['failed']  = !empty( $_GET['failed'] ) ? $_GET['failed'] : false;

Timber::render('page-login.twig', $context);



<?php

/**
 Template Name: Register
 */

$context = Timber::get_context();
$post    = new TimberPost();
$context['post'] = $post;


$context['hero']['title'] = $post->custom['hero_title'];
$context['hero']['subtitle'] = $post->custom['hero_subtitle'];
$context['hero']['description'] = $post->custom['hero_description'];
$context['hero']['show_or_hide'] = $post->custom['hero_show_or_hide'];




Timber::render('page-register.twig', $context);
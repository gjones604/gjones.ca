<?php
require __DIR__ . '/vendor/autoload.php';

	// Tracy PHP Debugging tool
	include('php-lib/tracy/src/tracy.php'); 
	use Tracy\Debugger;
	Debugger::enable();

	include('php-lib/config.php');
	include('php-lib/ajax-funcs.php');
	include('php-lib/course-cache.php');

	
	function scripts_and_styles() {

		wp_register_script('compiled_js', get_template_directory_uri().'/assets/js/dist/scripts.min.js', array('jquery') );
		wp_register_script('fuse', get_template_directory_uri().'/assets/js/dist/fuse.min.js', '', '' );

		wp_localize_script('compiled_js', 'myAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ))); 

		wp_enqueue_script('jquery');
		wp_enqueue_script('fuse');
		wp_enqueue_script('compiled_js', '', '', '', true);
	}

	add_action('wp_enqueue_scripts', 'scripts_and_styles', 100);	

<?php
require __DIR__ . '/vendor/autoload.php';

	// Tracy PHP Debugging tool
	// include('php-lib/tracy/src/tracy.php'); 
	// use Tracy\Debugger;
	// Debugger::enable();

	include('php-lib/config.php');



	
	function scripts_and_styles() {

		remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); 
		remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
		remove_action( 'admin_print_styles', 'print_emoji_styles' );

        wp_register_script('three_js', get_template_directory_uri().'/assets/vendor/three-js/build/three.min.js', array('jquery') );
        
        wp_enqueue_script('three_js');
		
		wp_register_script('compiled_js', get_template_directory_uri().'/assets/js/dist/scripts.min.js', array('jquery') );
		
       // wp_register_script('scripts', get_template_directory_uri().'/assets/js/src/scripts.js', array('jquery') );
        
        // Compiled JS
        wp_enqueue_script('compiled_js', '', '', '', true);

	}

	add_action('wp_enqueue_scripts', 'scripts_and_styles', 100);	

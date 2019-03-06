<?php
require __DIR__ . '/vendor/autoload.php';

	// Tracy PHP Debugging tool
	//include('php-lib/tracy/src/tracy.php'); 
	//use Tracy\Debugger;
	//Debugger::enable();

	include('php-lib/config.php');



	
	function scripts_and_styles() {

		remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); 
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' ); 
		remove_action( 'wp_print_styles', 'print_emoji_styles' ); 
		remove_action( 'admin_print_styles', 'print_emoji_styles' );

	
		
		wp_register_script('three_js', get_template_directory_uri().'/assets/js/three-js/build/three.min.js', array('jquery') );
		
		// three js addons
		//wp_register_script('projector', get_template_directory_uri().'/assets/js/three-js/examples/js/renderers/Projector.js', array('jquery') );
		//wp_register_script('detector', get_template_directory_uri().'/assets/js/three-js/examples/js/Detector.js', array('jquery') );
		//wp_register_script('canvasrenderer', get_template_directory_uri().'/assets/js/three-js/examples/js/renderers/CanvasRenderer.js', array('jquery') );
		
		wp_register_script('compiled_js', get_template_directory_uri().'/assets/js/dist/scripts.min.js', array('jquery') );
		

		// Compiled JS
		//wp_localize_script('compiled_js', 'myAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ))); 


		wp_enqueue_script('three_js');
		//wp_enqueue_script('projector');
		//wp_enqueue_script('detector');
		//wp_enqueue_script('canvasrenderer');


		wp_enqueue_script('compiled_js', '', '', '', true);
	}

	add_action('wp_enqueue_scripts', 'scripts_and_styles', 100);	

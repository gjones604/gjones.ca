<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array('search-form', 'gallery', 'caption' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		parent::__construct();
	}


	function add_to_context( $context ) {
		$context['menu'] = new TimberMenu();
		$context['site'] = $this;
		$context['path'] = get_template_directory_uri();
		return $context;
	}


	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

}

new StarterSite();





/**
  * Updates post meta for a post. It also automatically deletes or adds the value to field_name if specified
  *
  * @param      integer     The post ID for the post we're updating
  * @param      string      The field we're updating/adding/deleting
  * @param      string      [Optional] The value to update/add for field_name. If left blank, data will be deleted.
  */
  function update_acf_data( $post_id, $field_name, $value = '' ){
	  if ( empty( $value ) OR ! $value ){
		  delete_post_meta( $post_id, $field_name );
	  }elseif ( ! get_post_meta( $post_id, $field_name ) ){
		  add_post_meta( $post_id, $field_name, $value );
	  }else{
		  update_post_meta( $post_id, $field_name, $value );
	  }
  }
  
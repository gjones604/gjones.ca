<?php

/*
 * Create Posting: This function creates a new post of type "posting" and updates the ACF fields.
 * This is done via the /dashboard/create-posting page using AJAX.
 */

add_action( 'wp_ajax_nopriv_create_posting', 'create_posting' );
add_action( 'wp_ajax_create_posting', 'create_posting' );
function create_posting() {

    if ( !empty($_POST['value']) ){       

        $user = wp_get_current_user();
        $values = $_POST['value'];

        // Create post object
        $new_posting = array(
            'post_title'    => wp_strip_all_tags($values['posting_title']),
            'post_status'   => 'publish',
            'post_author'   => $user->ID,
            'post_type'     => 'posting'
        );
        
        // Insert the post into the database
        $new_post = wp_insert_post( $new_posting );
        

        // Update ACF with submitted data
        update_acf_data($new_post, 'number_of_positions', wp_strip_all_tags( $values['number_of_positions']));
        update_acf_data($new_post, 'compensation',        wp_strip_all_tags( $values['compensation']));
        update_acf_data($new_post, 'description',         wp_strip_all_tags( $values['description']));
        update_acf_data($new_post, 'requirements',        wp_strip_all_tags( $values['requirements']));
        update_acf_data($new_post, 'selected_courses',    wp_strip_all_tags( $values['selected_courses']));

        wp_update_post($new_post);

        echo json_encode($_POST['value']);

    }else{
        // fail
        echo "Something failed.";
    }

   die();
}

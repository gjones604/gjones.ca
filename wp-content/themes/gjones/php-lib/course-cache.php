<?php
function get_raw_data_from_api_or_cache($provider){

    $cache = new Gilbitron\Util\SimpleCache();
    $cache->cache_path = WP_CONTENT_DIR . '/themes/gjones/php-lib/course-cache/';
    $cache->cache_time = 9999999999;
    /*
        Time in seconds.
        604800 = 168 hrs / 1 week
        86400 = 24 hours
            3600 = 1 hour
    */

    switch ($provider) {
        case 'canvas';
            $api_url_dev = 'https://www.canvas.net';
            $endpoint = '/products.json';
        break;

        case 'futurelearn_courses';
            $api_url_dev = 'https://www.futurelearn.com';
            $endpoint = '/feeds/courses';
        break;

        case 'kadenze':
            $api_url_dev = 'https://www.kadenze.com';
            $endpoint = '/catalog.json';
        break;

        case 'udacity':
            $api_url_dev = 'https://www.udacity.com';
            $endpoint = '/public-api/v1/courses';
        break;

/*
        case 'eduopen';
            $api_url_dev = 'https://learn.eduopen.org';
            $endpoint = '/rss/courses.php';
        break;
*/
/*
        case 'edx';
            $api_url_dev = 'https://www.edx.org';
            $endpoint = '/api/catalog/v2/courses';
        break;
*/
/*
        case 'futurelearn_programs';
            $api_url_dev = 'https://www.futurelearn.com';
            $endpoint = '/feeds/programs';
        break;
*/

        /*
        case 'open2study';
        // XML
        break;
        */
    }
    
    if ( $data = $cache->get_cache('data-'.$provider) ){
        $data = json_decode($data);
    }else{
        $data = $cache->do_curl($api_url_dev . $endpoint);
        $cache->set_cache('data-'.$provider, $data);
        $data = json_encode($data);
        
        get_clean_data_from_api_or_cache($provider);

    }
    return $data;
}


function reduce_cached_data( $provider ){

    switch ($provider) {
        case 'canvas':
            $raw = get_raw_data_from_api_or_cache('canvas');
            $clean = array();
            
            foreach( $raw->products as $k=>$field ){
                // scan for Chinese characters
                preg_match("/\p{Han}+/u", $field->title, $match);
                if ( $match == FALSE ){
                    $clean[$k]['provider'] = 'canvas';
                    $clean[$k]['id'] = 'canvas-'.$field->id;
                    $clean[$k]['title'] = $field->title;
                    $clean[$k]['date'] = $field->date;
                    $clean[$k]['description'] = str_replace('<h2>', '<h3>', $field->teaser);
                    $clean[$k]['description'] = str_replace('</h2>', '</h3>', $clean[$k]['description']);
                    $clean[$k]['url'] = $field->url;
                    $clean[$k]['free'] = $field->free;
                    $clean[$k]['cost'] = $field->priceWithCurrency;
                    $clean[$k]['image'] = $field->image;
                    $clean[$k]['logo'] = $field->logo->url;
                }
            }

            return json_encode(array_values($clean));
        break;


    
        case 'futurelearn_courses':
            $raw = get_raw_data_from_api_or_cache('futurelearn_courses');
            $clean = array();
       
            foreach( $raw as $k=>$field ){
                preg_match("/\p{Han}+/u", $field->name, $match);
                if ( $match == FALSE ){
                    $clean[$k]['provider'] = 'futurelearn';   
                    $clean[$k]['id'] = 'futurelearn_courses-'.$field->uuid;
                    $clean[$k]['title'] = $field->name;
                    $clean[$k]['description'] = str_replace('<h2', '<h3', $field->description);
                    $clean[$k]['description'] = str_replace('</h2', '</h3', $clean[$k]['description']);
                    $clean[$k]['url'] = $field->url;
                    $clean[$k]['image'] = $field->image_url;
                    $clean[$k]['logo'] = $field->organisation->logo_url;
                    $clean[$k]['free'] = true;
                    //$clean[$k]['date'] = $field->;
                    //$clean[$k]['cost'] = $field->;
                    if (isset($field->trailer)){
                        $clean[$k]['video'] = $field->trailer;
                    }
                }
            }

            return json_encode(array_values($clean));
        break;
     


        case 'kadenze';
            $raw = get_raw_data_from_api_or_cache('kadenze');
            $clean = array();
           
            foreach( $raw as $k=>$field ){
                preg_match("/\p{Han}+/u", $field->name, $match);
                if (strpos($field->description, '<!--[if') === FALSE){
                    if ( $match == FALSE ){
                        $clean[$k]['provider'] = 'kadenze';
                        $clean[$k]['id'] = 'kadenze-'.$field->id;
                        $clean[$k]['title'] = $field->name;
                        $clean[$k]['description'] = str_replace('<h2>', '<h3>', $field->description);
                        $clean[$k]['description'] = str_replace('</h2>', '</h3>', $clean[$k]['description']);
                        $clean[$k]['url'] = $field->url;
                        $clean[$k]['image'] = $field->logo;
                        $clean[$k]['video'] = $field->promo_video;
                        //$clean[$k]['date'] = $field->;
                        //$clean[$k]['free'] = $field->;
                        //$clean[$k]['cost'] = $field->;
                        //$clean[$k]['logo'] = $field->;
                    }
                }
            }

            return json_encode(array_values($clean));
        break;



        case 'udacity';
            $raw = get_raw_data_from_api_or_cache('udacity');
            $clean = array();

            foreach( $raw->courses as $k=>$field ){
                if ( $field->available == true ){
                    preg_match("/\p{Han}+/u", $field->title, $match);
                    if ( $match == FALSE ){
                        $clean[$k]['provider'] = 'udacity';
                        $clean[$k]['id'] = 'udacity-'.$field->key;
                        $clean[$k]['title'] = $field->title;
                        $clean[$k]['description'] = str_replace('<h2>', '<h3>', $field->short_summary);
                        $clean[$k]['description'] = str_replace('</h2>', '</h3>', $clean[$k]['description']);
                        $clean[$k]['url'] = 'https://www.udacity.com/course/'.$field->slug;
                        $clean[$k]['image'] = $field->image;
                        //$clean[$k]['free'] = $field->;
                        //$clean[$k]['cost'] = $field->;
                        //$clean[$k]['date'] = $field->;
                        //$clean[$k]['logo'] = $field->;
                        if ( !empty($field->teaser_video->youtube_url )){
                            $clean[$k]['video'] = $field->teaser_video->youtube_url;
                        }else{
                            if ( isset($field->teaser_video->vimeo_id )){
                                $clean[$k]['video'] = 'https://vimeo.com/'.$field->teaser_video->vimeo_id; 
                            }
                        }
                    }
                }
            }

            return json_encode(array_values($clean));
        break;
    } //end switch
} //end func



/*
 * Retreive reduced JSON from course cache
 */
function get_clean_data_from_api_or_cache($provider){

    $cache = new Gilbitron\Util\SimpleCache();
    $cache->cache_path = WP_CONTENT_DIR . '/themes/gjones/php-lib/course-cache/';
    $cache->cache_time = 9999999999;
    /*
        Time in seconds.
        604800 = 168 hrs / 1 week
        86400 = 24 hours
            3600 = 1 hour
    */
    
    if ( $data = $cache->get_cache('data-'.$provider.'_clean') ){
        $data = json_decode($data);          
    }else{
        $data = reduce_cached_data($provider);
        $cache->set_cache('data-'.$provider.'_clean', $data);
        $data = json_encode($data);
    }
    return json_encode($data);
}


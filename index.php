<?php
/*
Plugin Name: Pim123 Product price
Plugin URI: https://www.darkxee.com
Description: Pim123 Product price
Version: 1.0
Author: Darkxee
Author URI:https://www.darkxee.com
License: Plugin comes under GPL Licence.
*/

wp_enqueue_script('datatable', plugins_url( '/js/jquery.dataTables.min.js' , __FILE__ ) , array( 'jquery' ));
wp_register_style( 'datatables-css', plugins_url('css/jquery.dataTables.min.css', __FILE__) );
wp_enqueue_script('custom-js', plugins_url( '/js/script.js' , __FILE__ ) , array( 'jquery' ));
wp_localize_script( 'custom-js', 'darkxee', array( 'callurl' => admin_url( 'admin-ajax.php')));





function get_console( $data ) {

    if ( is_array( $data ) )
        $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
    else
        $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";

    echo $output;
}


function show_form(){
  echo '<div id ="pim-data"></div>';
}
add_shortcode('dzx_data', 'show_form');



function dzx_query(){

	$name = $_POST['name'];
	$size = $_POST['size'];



	global $wpdb;
  $get_data = $wpdb->get_results(
    "SELECT * FROM pim123_product
    WHERE name LIKE '$name'
    AND size LIKE '$size'
    AND quantity Like 500 " );

	//echo $get_data;
	$data = json_encode($get_data);
  echo $data;
  	die();

}
add_action('wp_ajax_dzx_query', 'dzx_query');
add_action('wp_ajax_nopriv_dzx_query', 'dzx_dzx_query');

?>

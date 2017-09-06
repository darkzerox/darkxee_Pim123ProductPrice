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
wp_enqueue_script('datatable-respon', plugins_url( '/js/dataTables.responsive.min.js' , __FILE__ ) , array( 'jquery' ));
wp_enqueue_script('custom-js', plugins_url( '/js/script.js' , __FILE__ ) , array( 'jquery' ));
wp_localize_script( 'custom-js', 'darkxee', array( 'callurl' => admin_url( 'admin-ajax.php')));


wp_enqueue_style( 'dzx-css', plugins_url('/css/dzx.css', __FILE__) );
wp_enqueue_style( 'dataTables-css', plugins_url('/css/jquery.dataTables.min.css', __FILE__) );
wp_enqueue_style( 'responsive-css', plugins_url('/css/responsive.dataTables.min.css', __FILE__) );





/**
 * [get_console console.log js]
 * @param  [all] $data [data for console]
 * @return [log]       [description]
 */
function get_console( $data ) {

    if ( is_array( $data ) )
      $output = "<script>console.log( 'Debug Objects: " . implode( ',', $data) . "' );</script>";
    else
        $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";
    echo $output;
}

//start html skeleton
function show_form(){
  echo '<div id="data-form" class="form-contentner">
          <div class="form-group search_product">
            <label for="product_name">สินค้า</label>
            <select class="input-text" name="product_name" id="product_name">
            </select>
          </div>
          <div id="table-field">
          </div>

        </div>';
  //table skeleton
  echo '<div id ="pim-data"></div>';
}
add_shortcode('dzx_data', 'show_form');



function dzx_query(){

  $name = $_POST['name'];
  $size = $_POST['size'];
  $color =$_POST['color'];
  $page = $_POST['page'];
  $type = $_POST['type'];
  $quantity = $_POST['quantity'];
  $price_pu = $_POST['price_pu'];
  $price = $_POST['price'];
  $duration = $_POST['duration'];

  $cquery = 'SELECT * FROM pim123_'.$name.' WHERE 1 ';
  $cquery.= sql_candinate("size",$size);
  $cquery.= sql_candinate("color",$color);
  $cquery.= sql_candinate("page",$page);
  $cquery.= sql_candinate("type",$type);
  $cquery.= sql_candinate("quantity",$quantity);
  $cquery.= sql_candinate("price_pu",$price_pu);
  $cquery.= sql_candinate("price",$price);
  $cquery.= sql_candinate("size",$duration);
  getQuery($cquery);
}
//use for loin user
add_action('wp_ajax_dzx_query', 'dzx_query');
//use for none login
add_action('wp_ajax_nopriv_dzx_query', 'dzx_query');



function getlist() {
  getQuery('SELECT * FROM pim123_products GROUP BY name ORDER BY name ASC');
}
add_action('wp_ajax_getlist', 'getlist');
add_action('wp_ajax_nopriv_getlist', 'getlist');


function getTable(){
  $tablename = $_POST['tablename'];
  getQuery('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME="pim123_'.$tablename.'"');
}
add_action('wp_ajax_getTable', 'getTable');
add_action('wp_ajax_nopriv_getTable', 'getTable');





//get data query
function getQuery($query){
    global $wpdb;
    $get_data = $wpdb->get_results($query);
    //echo $get_data;
  	echo json_encode($get_data);
    die();
}
//return sql candinate
function sql_candinate($cand ,$val){
  if(!empty($val)){
    $d = ' AND '.$cand.' LIKE "'.$val.'%"';
  }
  return $d ;
}



?>

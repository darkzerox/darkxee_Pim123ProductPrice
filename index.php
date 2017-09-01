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
    <div class="form-group">
      <label for="product_name">สินค้า</label>
      <input type="text" name="product_name" id="product_name">
    </div>
    <div class="form-group">
      <label for="size">ขนาดกระดาษ</label>
      <input type="text" name="size" id="size">
    </div>
    <div class="form-group">
      <label for="color">เทคนิคการพิมพ์</label>
      <input type="text" name="color" id="color">
    </div>
    <div class="form-group">
      <label for="page">จำนวนหน้า</label>
      <input type="text" name="page" id="page">
    </div>
    <div class="form-group">
      <label for="type">ชนิดการะดาษ</label>
      <input type="text" name="type" id="type">
    </div>
    <div class="form-group">
      <label for="quantity">จำนวน</label>
      <input type="text" name="quantity" id="quantity">
    </div>
    <div class="form-group">
      <label for="price_u">ราคา/หน่วย</label>
      <input type="text" name="price_u" id="price_pu">
    </div>
    <div class="form-group">
      <label for="price">ราคาทั้งหมด</label>
      <input type="text" name="price" id="price">
    </div>
    <div class="form-group">
      <label for="duration">ระยะเวลา</label>
      <input type="text" name="duration" id="duration">
    </div>
    <div class="form-group full">
      <input type="submit" name="Submit" id="data_submit">
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




	global $wpdb;

  $cquery = 'SELECT * FROM pim123_product WHERE 1 ';
  $cquery.= sql_candinate("name",$name);
  $cquery.= sql_candinate("size",$size);
  $cquery.= sql_candinate("color",$color);
  $cquery.= sql_candinate("page",$page);
  $cquery.= sql_candinate("type",$type);
  $cquery.= sql_candinate("quantity",$quantity);
  $cquery.= sql_candinate("price_pu",$price_pu);
  $cquery.= sql_candinate("price",$price);
  $cquery.= sql_candinate("size",$duration);



  $get_data = $wpdb->get_results($cquery);

	//echo $get_data;
	$data = json_encode($get_data);
  echo $data;
  	die();

}
//use for loin user
add_action('wp_ajax_dzx_query', 'dzx_query');
//use for none login
add_action('wp_ajax_nopriv_dzx_query', 'dzx_query');


//return sql candinate
function sql_candinate($cand ,$val){
  if(!empty($val)){
    $d = ' AND '.$cand.' LIKE "'.$val.'%"';
  }
  return $d ;
}

?>

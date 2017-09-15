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
  <div class="form-load">
    <div>
    <img src= "'.plugins_url('/images/load.gif', __FILE__).'"/>
    </div>
  </div>
          <div class="form-group search_product">
            <label for="name">สินค้า</label>
            <select class="input-text" name="name" id="name">
            </select>
          </div>
          <div id="table-field">
          </div>
          <div class="form-group full">
            <input type="submit" name="Submit" id="data_submit">
          </div>
        </div>';
  //table skeleton
  echo '<div id ="pim-data"></div>';
}
add_shortcode('dzx_data', 'show_form');

function getlist() {
  $tabledata = $_POST['tabledata'];
  getQuery('SELECT * FROM pim123_'.$tabledata.'');
}
add_action('wp_ajax_getlist', 'getlist');
add_action('wp_ajax_nopriv_getlist', 'getlist');

function dzx_query(){

  $name = $_POST['name'];
  $size = $_POST['size'];
  $color =$_POST['color'];
  $page_type = $_POST['page_type'];
  $paper_type = $_POST['paper_type'];
  $quantity = $_POST['quantity'];
  $price_unit = $_POST['price_unit'];
  $price = $_POST['price'];
  $duration = $_POST['duration'];
  $coating = $_POST['coating'];
  $punch = $_POST['punch'];
  $fold = $_POST['fold'];
  $make_book = $_POST['make_book'];
  $book_page = $_POST['book_page'];
  $string = $_POST['string'];
  $shape = $_POST['shape'];
  $sticker_delivery = $_POST['sticker_delivery'];


  $cquery = 'SELECT * FROM pim123_'.$name.' WHERE 1 ';
  $cquery .= sql_candinate("size",$size);
  $cquery .= sql_candinate("color",$color);
  $cquery .= sql_candinate("page_type",$page_type);
  $cquery .= sql_candinate("paper_type",$paper_type);
  $cquery .= sql_candinate("quantity",$quantity);
  $cquery .= sql_candinate("price_unit",$price_unit);
  $cquery .= sql_candinate("price",$price);
  $cquery .= sql_candinate("duration",$duration);
  $cquery .= sql_candinate("coating",$coating);
  $cquery .= sql_candinate("punch",$punch);
  $cquery .= sql_candinate("fold",$fold);
  $cquery .= sql_candinate("make_book",$make_book);
  $cquery .= sql_candinate("book_page",$book_page);
  $cquery .= sql_candinate("string",$string);
  $cquery .= sql_candinate("shape",$shape);
  $cquery .= sql_candinate("sticker_delivery",$sticker_delivery);



  getQuery($cquery);



}
add_action('wp_ajax_dzx_query', 'dzx_query');
add_action('wp_ajax_nopriv_dzx_query', 'dzx_query');

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
  	echo json_encode($get_data);
    die();
}
function sql_candinate($cand ,$val){
  $d = "";
  if(!empty($val)){
    $d = ' AND '.$cand.' LIKE "'.$val.'"';
  }
  return $d ;
}



?>

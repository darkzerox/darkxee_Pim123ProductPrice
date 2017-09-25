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
  echo '<form id="data-form" class="form-contentner">
          <div class="form-load">
            <div>
            <img src= "'.plugins_url('/images/Ripple.svg', __FILE__).'"/>
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

            <button id ="data_submit">ค้นหาสินค้า</button>

          </div>
        </form>';
  //table skeleton
  echo '<div id ="pim-data"></div>';
}
add_shortcode('dzx_data', 'show_form');

function getlist() {

  if ($_POST['pd'] !=""){
    $wheresql = ' WHERE db_name LIKE "'.$_POST['pd'].'"';
  }

  getQuery('SELECT * FROM pim123_'.$_POST['tabledata']. $wheresql . ' ORDER BY name' );
}
add_action('wp_ajax_getlist', 'getlist');
add_action('wp_ajax_nopriv_getlist', 'getlist');

function dzx_query(){
  $cquery = 'SELECT * FROM pim123_'.$_POST['name'].' WHERE 1 ';
  $cquery .= sql_candinate("size",$_POST['size']);
  $cquery .= sql_candinate("color",$_POST['color']);
  $cquery .= sql_candinate("page_type",$_POST['page_type']);
  $cquery .= sql_candinate("paper_type",$_POST['paper_type']);
  $cquery .= sql_candinate("quantity",$_POST['quantity']);
  $cquery .= sql_candinate("price_unit",$_POST['price_unit']);
  $cquery .= sql_candinate("price",$_POST['price']);
  $cquery .= sql_candinate("duration",$_POST['duration']);
  $cquery .= sql_candinate("coating",$_POST['coating']);
  $cquery .= sql_candinate("punch",$_POST['punch']);
  $cquery .= sql_candinate("fold",$_POST['fold']);
  $cquery .= sql_candinate("make_book",$_POST['make_book']);
  $cquery .= sql_candinate("book_page",$_POST['book_page']);
  $cquery .= sql_candinate("string",$_POST['string']);
  $cquery .= sql_candinate("shape",$_POST['shape']);
  $cquery .= sql_candinate("sticker_delivery",$_POST['sticker_delivery']);

  $cquery .= sql_candinate("paper_type_cover",$_POST['paper_type_cover']);
  $cquery .= sql_candinate("color_cover",$_POST['color_cover']);
  $cquery .= sql_candinate("quantity_cover",$_POST['quantity_cover']);
  $cquery .= sql_candinate("coating_cover",$_POST['coating_cover']);
  $cquery .= sql_candinate("paper_type_inner",$_POST['paper_type_inner']);
  $cquery .= sql_candinate("color_inner",$_POST['color_inner']);
  $cquery .= sql_candinate("quantity_inner",$_POST['quantity_inner']);
  $cquery .= sql_candinate("coating_inner",$_POST['coating_inner']);
  $cquery .= sql_candinate("pooh",$_POST['pooh']); 

  getQuery($cquery);



}
add_action('wp_ajax_dzx_query', 'dzx_query');
add_action('wp_ajax_nopriv_dzx_query', 'dzx_query');

function getTable(){

  if ($_POST['pd'] !=""){
    $tablename = $_POST['pd'];
  }else{
    $tablename = $_POST['tablename'];
  }
  getQuery('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME="pim123_'.$tablename.'"');
}
add_action('wp_ajax_getTable', 'getTable');
add_action('wp_ajax_nopriv_getTable', 'getTable');


function getTableOption(){

  if ($_POST['pd'] !=""){
    $table = $_POST['pd'];
  }else{
    $table = $_POST['table'];
  }
  $field = $_POST['field'];
 $Tquery = 'SELECT DISTINCT '.$field.' FROM pim123_'.$table.' ORDER BY '.$field;
  getQuery($Tquery);


}
add_action('wp_ajax_getTableOption', 'getTableOption');
add_action('wp_ajax_nopriv_getTableOption', 'getTableOption');



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

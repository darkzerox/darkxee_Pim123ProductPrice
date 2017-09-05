$ = jQuery;
$(document).ready(function() {

  getProductList();

  $('#data_submit').on('click', function() {
    update_table();
  });
  $('#data-form .form-group').on('keyup change', function() {
    update_table();
  });
  //console.log('click');

  //console.log($('#data-form #product_name').val());

  /**
   * [type ajax return sql data]
   * @type {String}
   */
});

function update_table() {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      //call php function
      "action": "dzx_query",
      //sent var data
      "name": $('#data-form #product_name').val(),
      "size": $('#data-form #size').val(),
      "color": $('#data-form #color').val(),
      "page": $('#data-form #page').val(),
      "type": $('#data-form #type').val(),
      "quantity": $('#data-form #quantity').val(),
      "price_pu": $('#data-form #price_pu').val(),
      "price": $('#data-form #price').val(),
      "duration": $('#data-form #duration').val()


    },
    /**
     * [return data from php function]
     * @param  {[json]} data [sql data]
     */
    success: function(data) {

      // console.log(  `
      //   "name": ${$('#data-form #product_name').val()},
      //   "size": ${$('#data-form #size').val()},
      //   "color": ${$('#data-form #color').val()},
      //   "page": ${$('#data-form #page').val()},
      //   "type": ${$('#data-form #type').val()},
      //   "quantity": ${$('#data-form #quantity').val()},
      //   "price_pu": ${$('#data-form #price_pu').val()},
      //   "price": ${$('#data-form #price').val()},
      //   "duration": ${$('#data-form #duration').val()}
      //   `);



      $('#pim-data').html('').append(`
            <table id="tabledata" class="display responsive nowrap">
              <thead>
                <tr>
                  <th>สินค้า</th>
                  <th>ขนาด</th>
                  <th>สี</th>
                  <th>จำนวนหน้า</th>
                  <th>ชนิดกระดาษ</th>
                  <th>จำนวน</th>
                  <th>ราคา/ชื้น</th>
                  <th>ราคาทั้งหมด</th>
                  <th>ระยะเวลาผลิต</th>
                </tr>
              </thead>

            </table>
            `);


      var columns = [{
          "data": "name",
          "responsivePriority": 1000
        },
        {
          "data": "size",
          "responsivePriority": 1
        },
        {
          "data": "color",
          "responsivePriority": 1
        },
        {
          "data": "page",
          "responsivePriority": 1
        },
        {
          "data": "type",
          "responsivePriority": 1
        },
        {
          "data": "quantity",
          "responsivePriority": 1002
        },
        {
          "data": "price_pu",
          "responsivePriority": 1
        },
        {
          "data": "price",
          "responsivePriority": 1003
        },
        {
          "data": "duration",
          "responsivePriority": 1000
        },


      ];
      var columnDefs = [{
          "responsivePriority": 1,
          "targets": 2
        },
        {
          "targets": -1,
          "responsivePriority": 1,
          "data": null,
          "defaultContent": "<i class=\"fa fa-edit edit\" title=\"edit record\"></i>",
          "orderable": false
        }
      ];

      data = JSON.parse(data);
      //console.log(data);

      $('#tabledata').DataTable({
        responsive: true,
        searching: false,
        "data": data,
        "columns": columns,
        "columnDefs": columnDefs,
      });

    }
  });


}


function getProductList() {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      //call php function
      "action": "getlist",
    },
    /**
     * [return data from php function]
     * @param  {[json]} data [sql data]
     */
    success: function(data) {
      data = JSON.parse(data);

      //  console.log(data);

      var listOption = "";
      var pName = [];
      var pSize = [];
      var pColor = [];
      var pPage = [];
      var pType = [];



      $.each(data, function(i, item) {

        pName[i] = data[i].name;
        pSize[i] = data[i].size;
        pColor[i] = data[i].color;
        pPage[i] = data[i].page;
        pType[i] = data[i].type;

        // console.log( data[i].name );
        listOption += `<option value="${data[i].name}">${data[i].name}</option>`;
      })


      $('#product_name').append(listOption);




      console.log(arrayRemoveDup(pName));
      console.log(arrayRemoveDup(pSize));
      console.log(arrayRemoveDup(pColor));
      console.log(arrayRemoveDup(pPage));
      console.log(arrayRemoveDup(pType));

    }
  });
}


function arrayRemoveDup(data) {
  return  data.filter( (el, i, arr) => arr.indexOf(el) === i).sort();

}

$ = jQuery;
$(document).ready(function() {

  getProductList();
  // getTable();

  $('#data_submit').on('click', function() {
    getProductList();
    update_table();
    getTable();

  });
  $('#data-form .form-group').on('keyup change', function() {
    getProductList();
    getTable();
    update_table();
  });

});


function getTable() {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      'action': 'getTable',
      'tablename': $('#product_name').val()

    },
    success: function(data) {
      console.log(data);
      data = JSON.parse(data);
      var formfield = "";
      $.each(data, function(i, item) {

        if (item.COLUMN_NAME !== 'id' && item.COLUMN_NAME !== 'note' && item.COLUMN_NAME !== 'name') {
          formfield += `<div class="form-group">
                          <label for="${item.COLUMN_NAME}">${item.COLUMN_NAME}</label>
                          <select class="input-text" type="text" name="${item.COLUMN_NAME}" id="${item.COLUMN_NAME}"></select>
                        </div>`

        }


      })
      formfield += `<div class="form-group full">
        <input type="submit" name="Submit" id="data_submit">
      </div>`;
      $('#table-field').html('');
      $('#table-field').append(formfield);



    }
  });
}


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
      "action": "getlist",
    },
    success: function(data) {
      data = JSON.parse(data);
      var listOption = "";

      $.each(data, function(i, item) {
        listOption += `<option value="${item.db_name}">${item.name}</option>`;
      })
      $('#product_name').append(listOption);
      getTable();
    }
  });
}


function arrayRemoveDup(data) {
  return data.filter((el, i, arr) => arr.indexOf(el) === i).sort();

}

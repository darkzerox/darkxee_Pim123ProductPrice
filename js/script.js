$ = jQuery;

//var includeTable = [];
var excludeField = ['id', 'name', 'note', 'price_unit', 'duration', 'quantity', 'price'];

//translaate
var txtlist = {
  'color': 'สี',
  'size': 'จำนวน',
  'page_type': 'จำนวนหน้าพิมพ์',
  'paper_type': 'ประเภทกระดาษ',
  'quantity': 'จำนวน',
  'size': 'ขนาด',
  'price_unit': 'ราคาต่อหน่วย',
  'price': 'ราคารวม',
  'duration': 'ระยะเวลาผลิต',
  'coating': 'การเคลือบ',
  'punch': 'การเจาะรู',
  'fold': 'การพับ',
  'make_book': 'การเข้าเล่ม',
  'book_page': 'จำนวนหน้า',
  'string': 'เชือก',
  'shape': 'รูปทรงสติ๊กเกอร์',
  'sticker_delivery': 'sticker_delivery',
  'decorate': 'การตกแต่ง',
};

//number format
var formatter = new Intl.NumberFormat('th-TH', {
  minimumFractionDigits: 2,
});


$(document).ready(function() {
  getProductList();

  $('#data_submit').on('click', function() {
    $('.form-load').fadeIn();
    update_table();
  });

  $('#data-form #name').change(function() {
    $('.form-load').fadeIn();
    getTable();
  });


});




function getProductList() {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      "action": "getlist",
      "tabledata": "products",
    },
    success: function(data) {
      data = JSON.parse(data).sort(name);
      var listOption = "";
      $.each(data, function(i, item) {
        listOption += `<option value="${item.db_name}">${item.name}</option>`;
      })
      $('#name').append(listOption);

      getTable();



    }
  });
}

function getTable() {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      'action': 'getTable',
      'tablename': $('#name').val()

    },
    success: function(data) {

      data = JSON.parse(data);

      var formfield = "";
      $.each(data, function(i, item) {

        if (excludeField.indexOf(item.COLUMN_NAME) == -1) {
          formfield += `<div class="form-group">
                          <label for="${item.COLUMN_NAME}">${__t(item.COLUMN_NAME)}</label>
                          <select class="input-text" type="text" name="${item.COLUMN_NAME}" id="${item.COLUMN_NAME}"></select>
                        </div>`;
          getTableOption(item.COLUMN_NAME);
        }

      })

      $('#table-field').html('');
      $('#table-field').append(formfield);
    }
  });
}


function getTableOption(field) {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      'action': 'getTableOption',
      'field': field,
      'table': $('#name').val(),
    },
    success: function(data) {
      data = JSON.parse(data);
      var listOption = '';
      $.each(data, function(i, item) {
        listOption += `<option value="${item[field]}">${item[field]}</option>`;
      })
      $('#' + field).append(listOption);
      $('.form-load').fadeOut();
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
      "name": $('#data-form #name').val(),
      "size": $('#data-form #size').val(),
      "color": $('#data-form #color').val(),
      "page_type": $('#data-form #page_type').val(),
      "paper_type": $('#data-form #paper_type').val(),
      "quantity": $('#data-form #quantity').val(),
      "price_unit": $('#data-form #price_unit').val(),
      "price": $('#data-form #price').val(),
      "duration": $('#data-form #duration').val(),
      "coating": $('#data-form #coating').val(),
      "punch": $('#data-form #punch').val(),
      "fold": $('#data-form #fold').val(),
      "make_book": $('#data-form #make_book').val(),
      "book_page": $('#data-form #book_page').val(),
      "string": $('#data-form #string').val(),
      "shape": $('#data-form #shape').val(),
      "sticker_delivery": $('#data-form #sticker_delivery').val(),
      "decorate": $('#data-form #decorate').val(),

    },
    /**
     * [return data from php function]
     * @param  {[json]} data [sql data]
     */
    success: function(data) {
      data = JSON.parse(data);
      if (data.length > 0) {
        var resault = `
        <table>
          <thead>
            <tr>
              <th>จำนวน</th>
              <th>ราคา/ชิ้น</th>
              <th>ราคารวม</th>
              <th>เวลาผลิต</th>
              <th>สั่งซื้อ</th>
            </tr>
          </thead>
          <tbody>

          `;
        $.each(data, function(k, v) {
          //var date = new Date();
          //date.setDate(date.getDate() + parseInt(v.duration));
          //date = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

          resault += `<tr>
            <td>${formatter.format(v.quantity)}</td>
            <td>${formatter.format(v.price_unit)}</td>
            <td>${formatter.format(v.price)}</li>
            <td>${v.duration} วัน</td>
            <td><button class="btn-call-order">Click</button></td>
            </tr>`;

        });
        resault += `</tbody></table>`;

      } else {
        resault = "ไม่พบข้อมูล";
      }

      $('#pim-data').html('').append(`${resault}`);

      $('.form-load').fadeOut();

      $('html, body').animate({
        scrollTop: $('#pim-data').offset().top - 50
      }, 1000);

    }
  });

}
//translate function
function __t(txt) {
  if (txt in txtlist) {
    return txtlist[txt];
  } else {
    return txt;
  }

}


$(document).ajaxComplete(function() {
  $(".btn-call-order").click(function() {
    var $row = $(this).closest("tr"); // Find the row
    var $text = $row.find('td').text(); // Find the text
    console.log($text);
  });
});

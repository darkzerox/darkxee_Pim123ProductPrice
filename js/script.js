$ = jQuery;
//var includeTable = [];
var excludeField = ['id', 'name', 'note', 'price_unit', 'duration', 'quantity', 'price'];

//translaate
var txtlist = {
  'color': 'สี',
  'size': 'จำนวน',
  'page_type': 'จำนวนหน้าพิมพ์ (ด้าน)',
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
  'paper_type_cover': 'ประเภทกระดาษ (ปก)',
  'color_cover': 'สี  (ปก)',
  'quantity_cover': 'จำนวนหน้าพิมพ์  (ปก)',
  'coating_cover': 'การเคลือบ  (ปก)',
  'paper_type_inner': 'ประเภทกระดาษ (ด้านใน)',
  'color_inner': 'สี (ด้านใน)',
  'quantity_inner': 'จำนวนหน้าพิมพ์ (ด้านใน)',
  'coating_inner': 'การเคลือบ (ด้านใน)',
  'pooh': 'ภู่',


};

//number format
var formatter = new Intl.NumberFormat('th-TH', {
  minimumFractionDigits: 2,
});


$(document).ready(function() {
  getProductList();

  $('#data_submit').on('click', function(e) {
    e.preventDefault();
    $('.form-load').fadeIn();
    update_table();
    $('#pim-data').fadeIn();
  });

  $('#data-form #name').change(function() {
    $('.form-load').fadeIn();
    $('#pim-data').fadeOut('slow');
    getTable();

  });


});




function getProductList() {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      'action': 'getlist',
      'tabledata': 'products',
      'pd': getUrlParameter('pd'),
    },
    success: function(data) {
      data = JSON.parse(data).sort(name);
      var listOption = "";
      $.each(data, function(i, item) {
        listOption += `<option value="${item.db_name}">${item.name}</option>`;
      })
      $('#data-form #name').append(listOption);

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
      'tablename': $('#name').val(),
      'pd': getUrlParameter('pd'),

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
      'pd': getUrlParameter('pd'),
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
  var formdata = $('#data-form').serialize();
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: formdata + '&action=dzx_query',


    /**
     * [return data from php function]
     * @param  {[json]} data [sql data]
     */
    success: function(data) {
      data = JSON.parse(data);
      console.log(data);

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



function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

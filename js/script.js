$ = jQuery;

//var includeTable = [];
var excludeField = ['id', 'name', 'note', 'price_unit', 'price', 'duration', 'quantity'];

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




$(document).ready(function() {
  getProductList();

  // update_table();


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

function getOptionList() {
  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      "action": "getlist",
      "tabledata": $('#name').val(),
    },
    success: function(data) {

      $('.form-load').fadeOut();


      data = JSON.parse(data);

      var size = [];
      var color = [];
      var page_type = [];
      var paper_type = [];
      var quantity = [];
      var price_unit = [];
      var price = [];
      var duration = [];
      var coating = [];
      var punch = [];
      var fold = [];
      var make_book = [];
      var book_page = [];
      var string = [];
      var shape = [];
      var sticker_delivery = [];
      var decorate = [];



      $.each(data, function(k, v) {
        if (size.indexOf(v.size) == -1) {
          size.push(v.size);
        }
        if (color.indexOf(v.color) == -1) {
          color.push(v.color);
        }
        if (page_type.indexOf(v.page_type) == -1) {
          page_type.push(v.page_type);
        }
        if (paper_type.indexOf(v.paper_type) == -1) {
          paper_type.push(v.paper_type);
        }
        if (quantity.indexOf(v.quantity) == -1) {
          quantity.push(v.quantity);
        }
        if (price_unit.indexOf(v.price_unit) == -1) {
          price_unit.push(v.price_unit);
        }
        if (price.indexOf(v.price) == -1) {
          price.push(v.price);
        }
        if (duration.indexOf(v.duration) == -1) {
          duration.push(v.duration);
        }
        if (coating.indexOf(v.coating) == -1) {
          coating.push(v.coating);
        }
        if (punch.indexOf(v.punch) == -1) {
          punch.push(v.punch);
        }
        if (fold.indexOf(v.fold) == -1) {
          fold.push(v.fold);
        }
        if (make_book.indexOf(v.make_book) == -1) {
          make_book.push(v.make_book);
        }
        if (book_page.indexOf(v.book_page) == -1) {
          book_page.push(v.book_page);
        }
        if (string.indexOf(v.string) == -1) {
          string.push(v.string);
        }
        if (shape.indexOf(v.shape) == -1) {
          shape.push(v.shape);
        }
        if (string.indexOf(v.string) == -1) {
          string.push(v.string);
        }
        if (sticker_delivery.indexOf(v.sticker_delivery) == -1) {
          sticker_delivery.push(v.sticker_delivery);
        }
        if (decorate.indexOf(v.decorate) == -1) {
          decorate.push(v.decorate);
        }

      });
      getOptionHtml(size, "#size");
      getOptionHtml(color, "#color");
      getOptionHtml(page_type, "#page_type");
      getOptionHtml(paper_type, "#paper_type");
      getOptionHtml(quantity, "#quantity");
      getOptionHtml(price_unit, "#price_unit");
      getOptionHtml(price, "#price");
      getOptionHtml(coating, "#coating");
      getOptionHtml(duration, "#duration");
      getOptionHtml(punch, "#punch");
      getOptionHtml(fold, "#fold");
      getOptionHtml(make_book, "#make_book");
      getOptionHtml(book_page, "#book_page");
      getOptionHtml(string, "#string");
      getOptionHtml(shape, "#shape");
      getOptionHtml(string, "#string");
      getOptionHtml(sticker_delivery, "#sticker_delivery");
      getOptionHtml(decorate, "#decorate");


    }
  });
}

function getOptionHtml(data, id) {
  data.sort();
  listOption = "";
  if (data.length > 0) {
    $.each(data, function(i, item) {
      listOption += `<option value="${item}">${item}</option>`;
    })
    $(id).append(listOption);
  }

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
                        </div>`
        }

        if (item.COLUMN_NAME !== 'id' && item.COLUMN_NAME !== 'note' && item.COLUMN_NAME !== 'name') {


        }


      })

      $('#table-field').html('');
      $('#table-field').append(formfield);

      getOptionList();

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
      console.log(data.length);
      if (data.length > 0) {
        console.log(data);
        var resault = "";
        $.each(data, function(k, v) {
          var date = new Date();
          date.setDate(date.getDate() + parseInt(v.duration));


          resault += `<ul>
            <li>จำนวน : ${v.quantity}</li>
            <li>ราคาต่อชิ้น : ${v.price_unit}</li>
            <li>ราคารวม : ${v.price}</li>
            <li>วันที่ได้สินค้า : ${date.toDateString()}</li>
            </ul>`;

        });



      } else {
        resault = "ไม่พบข้อมูล";
      }

      $('#pim-data').html('').append(`
        <ul>
        ${resault}
        </ul>
            `);

    $('.form-load').fadeOut();

    }
  });


}

//trans
function __t(txt) {
  if (txt in txtlist) {
    return txtlist[txt];
  } else {
    return txt;
  }

}

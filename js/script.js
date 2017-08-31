$ = jQuery;
$(document).ready(function() {


  $.ajax({
    type: 'POST',
    url: darkxee.callurl,
    data: {
      "action": "dzx_query", // use jquery get val
      "name": 'กระดาษหัวจดหมาย',
      "size": 'A4',

    },
    success: function(data) {

      $('#pim-data').append(`
        <table id="example" class="display" cellspacing="0" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Color</th>
              <th>Page</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>AllPrice</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Color</th>
              <th>Page</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price/Unit</th>
              <th>AllPrice</th>
              <th>Duration</th>
            </tr>
          </tfoot>
        </table>
        `);

      data = JSON.parse(data);
    //  console.log(data);

      $('#example').DataTable({
        "aaData": data,
        "aoColumns": [
          {"mDataProp": "name"},
          {"mDataProp": "size"},
          {"mDataProp": "color"},
          {"mDataProp": "page"},
          {"mDataProp": "type"},
          {"mDataProp": "quantity"},
          {"mDataProp": "price_pu"},
          {"mDataProp": "price"},
          {"mDataProp": "duration"}
        ]

      });

      console.log(data);

      //$('#btn-click').append(data);
    }
  });







});

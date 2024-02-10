$(document).ready(function () {
    let checkedAmenities = {};
  
    $('input[type="checkbox"]').change(function () {
      if (this.checked) {
        checkedAmenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete checkedAmenities[$(this).data('id')];
      }
  
      $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
    });
  
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success' && data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }).fail(function () {
      $('#api_status').removeClass('available');
    });
  });

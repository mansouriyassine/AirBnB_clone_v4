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
  });

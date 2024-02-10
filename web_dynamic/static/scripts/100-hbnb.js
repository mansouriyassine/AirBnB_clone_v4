$(document).ready(function () {
    let checkedAmenities = {};
    let checkedStates = {};
    let checkedCities = {};
  
    $('input[type="checkbox"]').change(function () {
        if ($(this).closest('.locations').length) {
            if ($(this).closest('ul').hasClass('popover')) {
                if (this.checked) {
                    checkedStates[$(this).data('id')] = $(this).data('name');
                } else {
                    delete checkedStates[$(this).data('id')];
                }
                $('.locations h4').text(Object.values(checkedStates).join(', '));
            } else {
                if (this.checked) {
                    checkedCities[$(this).data('id')] = $(this).data('name');
                } else {
                    delete checkedCities[$(this).data('id')];
                }
            }
        } else {
            if (this.checked) {
                checkedAmenities[$(this).data('id')] = $(this).data('name');
            } else {
                delete checkedAmenities[$(this).data('id')];
            }
            $('.amenities h4').text(Object.values(checkedAmenities).join(', '));
        }
    });
  
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    }).fail(function () {
        $('#api_status').removeClass('available');
    });
  
    $('button').click(function () {
        let amenityIds = Object.keys(checkedAmenities);
        let stateIds = Object.keys(checkedStates);
        let cityIds = Object.keys(checkedCities);
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenityIds, states: stateIds, cities: cityIds }),
            success: function (data) {
                $('section.places').html('');
                for (let place of data) {
                    let placeHtml = `<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">${place.description}</div>
                    </article>`;
                    $('section.places').append(placeHtml);
                }
            }
        });
    });
});

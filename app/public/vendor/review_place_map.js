$(document).ready(function () {
	var place;
	var lat;
	var lon;
	var name;
	var address;
	var txt_lat = 'k';
	var txt_lon = 'B';
	
	function initialize() {
		var mapOptions = {
			center: new google.maps.LatLng(-33.8688, 151.2195),
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById('map_review_place'), mapOptions);
        var input = document.getElementById('searchTextField');
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
		  draggable:true
        });
		google.maps.event.addListener(marker, "dragend", function() {
			//console.log(marker);
			$('#rp-longitude-tf').attr('value', marker.position[txt_lat]);
			$('#rp-latitude-tf').attr('value', marker.position[txt_lon]);
		});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
			infowindow.close();
			marker.setVisible(false);
			input.className = '';
			place = autocomplete.getPlace();
			//console.log(place);
			if (!place.geometry) {
				// Inform the user that the place was not found and return.
				input.className = 'notfound';
				return;
			}
			// If the place has a geometry, then present it on a map.
			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);  // Why 17? Because it looks good.
			}
			var geolocation = place.geometry.location;
			lat = geolocation[txt_lat];
			lon = geolocation[txt_lon];
			name = place.name;
			
			var num_arr_adress = place.address_components.length;
			$('#rp-vicinity-tf').val(place.vicinity);
			$('#rp-city-tf').val(place.address_components[num_arr_adress-2].long_name);
			$('#rp-country-tf').val(place.address_components[num_arr_adress-1].long_name);
			$('#rp-country_short-tf').val(place.address_components[num_arr_adress-1].short_name);
		  
			var image = {
				url: place.icon,
				size: new google.maps.Size(71,71),
				origin: new google.maps.Point(0,0),
				anchor: new google.maps.Point(17,34),
				scaledSize: new google.maps.Size(35,35)
			};
			marker.setIcon(image);
			marker.setPosition(place.geometry.location);
			marker.setVisible(true);

			if (place.address_components) {
				console.log(place);
				address = [
					(place.address_components[0] && place.address_components[0].short_name || ''),
					(place.address_components[1] && place.address_components[1].short_name || ''),
					(place.address_components[2] && place.address_components[2].short_name || '')
				].join(' ');
				$('#rp-longitude-tf').attr('value',lat);
				$('#rp-latitude-tf').attr('value',lon);
				$('#rp-address-tf').attr('value',place.formatted_address);
			}
			infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
			infowindow.open(map, marker);
        });
        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
		function setupClickListener(id, types) {
			var radioButton = document.getElementById(id);
			google.maps.event.addDomListener(radioButton, 'click', function() {
				autocomplete.setTypes(types);
			});
		}
		setupClickListener('changetype-all', []);
		setupClickListener('changetype-establishment', ['establishment']);
		setupClickListener('changetype-geocode', ['geocode']);
	}
	google.maps.event.addDomListener(window, 'load', initialize);
});
var final_boxes = $('#final_boxes')
var testButton = $("#test-button")
var launchButton = $("#launch")
var startButton = $("#choose-start")
var endButton = $("#choose-end")
startButton.click(function() {
	$(this).checked=true
	endButton.checked=false;
});
endButton.click(function() {
	$(this).checked=true
	startButton.checked=false;
});
function changeMarkerPosition(marker, newloc, map){
	marker.setPosition(newloc);
	marker.set(map);
};

function initMap() {
	flightPathCoordinates = []
	var strictBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(37.3216777898, -121.986401869),
    	new google.maps.LatLng(37.4460080798, -121.677163537)
    );
	var options = {
		zoom: 12,
		center: {lat: 37.3838429348, lng: -121.8317805197},
		mapTypeId: google.maps.MapTypeId.HYBRID,
		minZoom: 11
	}
	var map = new google.maps.Map(document.getElementById('map'), options);

	var startMarker = new google.maps.Marker({
		position: {lat: 37.876, lng: -122.258}
	});
	var endMarker = new google.maps.Marker({
		position: {lat: 37.876, lng: -122.258}
	});
	var flightPath = new google.maps.Polyline({
		  path: flightPathCoordinates,
		  geodesic: true,
		  strokeColor: '#FF0000',
		  strokeOpacity: 1.0,
		  strokeWeight: 2
		});
	flightPath.setMap(null)
	// Add a listener for the click event
	var geocoder = new google.maps.Geocoder();
	map.addListener('click', function(event){
		if ($('#choose-start').hasClass('active')){
			latLng = event.latLng
			startMarker.setPosition(latLng)
			startMarker.setMap(map)
			flightPathCoordinates[0] = latLng
			$('#coordinates-of-start-point').text(latLng)
			reverseGeoCode(geocoder, latLng, function(err, returned){
				if (err) console.log("ERROR:", err)
				else {
					$('.details-of-start-point').text(returned)
				}
			});
		}
		else if ($('#choose-end').hasClass('active')){
			latLng = event.latLng
			endMarker.setPosition(latLng)
			endMarker.setMap(map)
			flightPathCoordinates[1] = latLng
			$('#coordinates-of-end-point').text(latLng)
			reverseGeoCode(geocoder, latLng, function(err, returned){
				if (err) console.log("ERROR:", err)
				else {
					$('.details-of-end-point').text(returned)
				}
			});
		}
		else {

		}
		if(flightPathCoordinates.length > 1){
			flightPath.setMap(null);
			flightPath = new google.maps.Polyline({
				  path: flightPathCoordinates,
				  geodesic: true,
				  strokeColor: '#FFC0CB',
				  strokeOpacity: 1.0,
				  strokeWeight: 5
				});
			flightPath.setMap(map);
		}
	});

	google.maps.event.addListener(map, 'dragend', function() {
     if (strictBounds.contains(map.getCenter())) return;

     // We're out of bounds - Move the map back within the bounds

     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = strictBounds.getNorthEast().lng(),
         maxY = strictBounds.getNorthEast().lat(),
         minX = strictBounds.getSouthWest().lng(),
         minY = strictBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     map.setCenter(new google.maps.LatLng(y, x));
    });

	var currentLocationMarker = new google.maps.Marker({
		position: {lat: 37.876, lng: -122.258},
		icon: {
			url: "https://image.ibb.co/bxWeCH/icon.png",
			scaledSize: new google.maps.Size(64, 64)
		}
	});
	var geo_options = {
	  enableHighAccuracy: true,
	  maximumAge        : 30000,
	  timeout           : 27000
	};
	var currentLocationDiv = document.createElement('div');
	var currentLocation = new showCurrentLocation(currentLocationDiv, map, currentLocationMarker, geo_options);
	var trackLocationDiv = document.createElement('div');
	var currentLocation = new trackCurrentLocation(trackLocationDiv, map, currentLocationMarker, geo_options);

	currentLocationDiv.index = 1;
	trackLocationDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(trackLocationDiv);
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(currentLocationDiv);

	launchButton.click(function() {
		var startpoint = $('#coordinates-of-start-point').text()
		var endpoint = $('#coordinates-of-end-point').text()
		url = 'https://9ff41eda.ngrok.io/returnCoordinates';
		$.getJSON(url, data={startpoint,endpoint},function(response){
			var coordinates = response['final_boxes']
			addPolygon(map, coordinates, '#00FFFF', 0.1);
		});
	});
	testButton.click(function() {
		var coordinates = [[{'lat': 37.4460080798, 'lng':-121.986401869}, {'lat':37.4460080798, 'lng':-121.677163537}, {'lat':37.3216777898, 'lng':-121.677163537}, {'lat':37.3216777898, 'lng':-121.986401869}]]
		addPolygon(map, coordinates, '#ff0000', 0);
	});
}

function reverseGeoCode(geocoder, latlng, callback) {
	geocoder.geocode({
		'latLng': latlng
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				var address = results[0].formatted_address
				callback(null, address)
			} else {
				callback("No results found", null);
			}
		} else {
			callback("Geocoder failed due to: " + status, null);
		}
	});
}

function showCurrentLocation(controlDiv, map, currentLocationMarker, geo_options) {
	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = 'Show Location';
	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Find current location';
	controlDiv.appendChild(controlUI);
	controlUI.appendChild(controlText);

	controlUI.addEventListener('click', function() {
		// Try HTML5 geolocation.
		var time = new Date();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				var time = new Date();
				currentLocationMarker.setPosition(pos);
				currentLocationMarker.setMap(map);
				map.panTo(pos);
				$(".current-latitude").text(position.coords.latitude)
				$(".current-longitude").text(position.coords.longitude)
				var altitude = position.coords.altitude != null ? position.coords.altitude : "Not Available"
				$(".current-altitude").text(altitude)
				var speed = position.coords.speed != null ? position.coords.speed : "Not Available"
				$(".current-speed").text(speed)
			}, function() {
				handleLocationError(true);
			}, geo_options);
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false);
		}
	});
}
function handleLocationError(browserHasGeolocation) {
	alert(browserHasGeolocation ?
					  'Error: The Geolocation service failed.' :
					  'Error: Your browser doesn\'t support geolocation.');
}

function trackCurrentLocation(controlDiv, map, currentLocationMarker, geo_options){
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Track current location';
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = 'Start Tracking';
	controlDiv.appendChild(controlUI);
	controlUI.appendChild(controlText);

	controlUI.addEventListener('click', function() {
		// Try HTML5 geolocation.
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(function(position){
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				currentLocationMarker.setPosition(pos)
				$(".current-latitude").text(position.coords.latitude)
				$(".current-longitude").text(position.coords.longitude)
				var altitude = position.coords.altitude != null ? position.coords.altitude : "Not Available"
				$(".current-altitude").text(altitude)
				var speed = position.coords.speed != null ? position.coords.speed : "Not Available"
				$(".current-speed").text(speed)
			}, function() {
				handleLocationError(true);
			}, geo_options);
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false);
		}
	});
}

function addPolygon(map, coordinates, color, fillOpacity) {
	// Define the LatLng coordinates for the polygon's path.
	for (var i = 0; i < coordinates.length; i++){
		var polygonCoordinates = coordinates[i]
		var poly = new google.maps.Polygon({
			paths: polygonCoordinates,
			strokeColor: color,
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: color,
			fillOpacity: fillOpacity
		});
		poly.setMap(map);
	}

}


/*
Get called when google is loaded.
*/
var googleSuccess = function() {

	'use strict'; // Developer-to-developer tip


	// Variables used to make a explore request to FourSquare API
	var key= "QDL2HZHN5Q1PEGZ4ORIGIDWOYKQ5FSBY1QJZCE0ZA14UUWZL";
	var secret = "U0ROAZOERED0AXOOMHAE5UG5P22AD2NRJM53HBBSNMEKM434";

	var latDefault = 40.7128;
	var lngDefault = -74.0059;
	var otherParams = "&section=food&limit=20&venuePhotos=1";
	var baseURL = "https://api.foursquare.com/v2/venues/explore?";

	var map;

	/*
	initMap() initialize a map.
	*/
	var initMap = function () {
		var locations;

		var options = {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById('googleMap'), options);
	    window.mapBounds = new google.maps.LatLngBounds();
	};

	initMap();

	/*
	The Place object which contains basic properties and marker.
	*/
	var Place = function(data) {
		data = data || {};

		var self = this;
		var venue = data.venue;

		self.name = venue.name;
		self.url = venue.url;
		self.lat = venue.location.lat;
		self.lng = venue.location.lng;
		self.location = venue.location.formattedAddress;
		self.price = venue.price.currency;
		self.rating = venue.rating;

		// Define a marker for this place
		self.marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(self.lat, self.lng)
		});

		// Add event listener for the marker. Show the infoWindow when clicked.
		self.marker.addListener("click", function() {self.showInfoWindow();});

		self.showInfoWindow = function() {
			// Bounce the marker at a limited period.
			self.marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function() {
				self.marker.setAnimation(null);
			}, 1500);

			// Open the infowindow.
			infoWindow.open(map, self.marker);
		};

		// Content string of infowindow
		var winContentStr = '<h4>' + '<a href="' + self.url + '" target="_blank">' + self.name + '</a>' + '</h4>' 
			+ '<p>price:<b>' + self.price + '</b>,rating:<b>' + self.rating + '</b></p>'	
			+ '<p>' + self.location + '</p>';

		// Define a infoWindow for this marker
		var infoWindow = new google.maps.InfoWindow({
				content: winContentStr
		});

		// For each place, extend the bounds object and adjust the viewport to the new marker
		var bounds = window.mapBounds;
		bounds.extend(new google.maps.LatLng(self.lat, self.lng)); 
		map.fitBounds(bounds);
		map.setCenter(bounds.getCenter());	
	};

	/*
	The ViewModel object which use Knockout.js to keep track of the states of
	placeList object and each Place object themself.
	*/
	var ViewModel = function() {
	var vm = this;

	// Array of place items in the ViewModle
	vm.placeList = ko.observableArray([]);
	// Filter text 
    vm.filterText = ko.observable("");

    // ko.utils.arrayFilter() ---filter the places according to the filter text.
    // And sync the markers at the same time by setting the map.
    vm.filteredPlaces = ko.computed(function() {
    	var filter = vm.filterText().toLowerCase();
    	var places = vm.placeList();

    	return ko.utils.arrayFilter(places, function(place) {
    	var isFiltered = place.name.toLowerCase().includes(filter);
    	if (isFiltered)
    		place.marker.setMap(map);
    	else
    		place.marker.setMap(null);
    	return isFiltered;
    	});
    	
   	 });

	// Use HTML5 geolocation to get the current location.
	// And make an ajax request to FourSquare API using that location
	if (navigator.geolocation) {

		// callback function, called when HTTP GET request to Foursquare fails.
		var jsonFailure = function () {
			alert("Access to Foursquare server is denied!");
		};

		// callback function, called when HTTP GET requet to Foursquare succeeds.
		var jsonSeccuss = function (data) {
			// Extract the array of recommended popular places info from response
			var places = data.response.groups[0].items;

			places.forEach(function(place) {
			vm.placeList.push(new Place(place));
			});
			
		};

		// callback function, called when getCurrentPosition succeeds.
		var geoSuccess = function (position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;

			var requestURL = baseURL + "client_id=" + key + "&client_secret=" + secret + "&v=20130815" 
					+ "&ll=" + lat + "," + lng + otherParams;

			$.getJSON(requestURL).fail(jsonFailure).done(jsonSeccuss);
			console.log(requestURL);
		};

		// callback function, called when getCurrentPosition fails.
		var geoError = function() {
			var requestURL = baseURL + "client_id=" + key + "&client_secret=" + secret + "&v=20130815" 
					+ "&ll=" + latDefault + "," + lngDefault + otherParams;

			$.getJSON(requestURL).fail(jsonFailure).done(jsonSeccuss);
			alert('Error: geolocation is failed. Now using the default center location.');
		};

		navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

	} else {
		geoError();
		alert('Error: Your browser doesn\'t support geolocation.');
	}
	};

	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	// Listen for resizing of the window and adjust the map bounds. 
    window.addEventListener('resize', function(event) {
		map.fitBounds(mapBounds);
	});
};

/*
Get called whrn loading loading failed.
*/
var googleFailure = function() {
	alert("Google API Cannot be loading.");
};
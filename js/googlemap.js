/**/

var map;
/*
initMap() is called when the page is loaded.
*/
var initMap = function () {
	var locations;

	var options = {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('googleMap'), options);
    window.mapBounds = new google.maps.LatLngBounds();
};


// //Calls the initMap() functionwhen the page loads.
// window.addEventListener('load', initMap);

// Listen for resizing of the window and adjust the map bounds. 
window.addEventListener('resize', function(event) {
	map.fitBounds(mapBounds);
});

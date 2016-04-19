## Neighborhood Map Project
Udacity Front End Nanodegree Project7-1.

[Neighborhodd Map](http://fionays.github.io/P7-1-Neighborhood-Map-Project/) is a very cool single-page apllication which features a map with the top 20 most popular places around your current neighborhood. It is a responsive degine and works across modern desktop, tablet, and phone browers.


### Running this application

1. Check out the repository 
  ```bash
$> git clone 
```
2. Run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m http.server 8000
  ```
5. Open a browser and visit localhost:8000.
6. Enable Geolocation to get your current location.


### Using Neighborhood Map
1. Use filter box to filter list items and map markers.
2. Select a list item or map marker to open info window decribing the place.



### Frameworks, Libraries and APIs 
1. [Knockout MVVM framework](http://knockoutjs.com/): used to handle the list and filter. 
2. [jQuery](http://api.jquery.com/jquery.getjson/): used to make AJAX requet to Foursquare API.
3. [Jasny Bootstrap](http://www.jasny.net/bootstrap/): used to create off-canvas navigation menu and make the page responsive.
4. [Google Maps API](https://developers.google.com/maps/): used to handle the map, markers and events.
5. [Foursquare API](https://developer.foursquare.com/start): used to get place information via HTTP GET method.


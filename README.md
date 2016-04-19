## Neighborhood Map Project
Udacity Front End Nanodegree Project7-1.

Neighborhodd Map is very cool single page apllication which features a map with the most popular places of your neighborhood.


### Running this application

1. Check out the repository 
  ```bash
$> git clone 
```
2. Get a **Google API Key** and replace it with the string **"YOUR_API_KEY"** in index.html line #45.
3. Get the **Fouresquare API credentials** by [registering the app](https://foursquare.com/developers/apps) and replace them in js/app.js line #5 and line #6.
4. Run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m http.server 8000
  ```
5. Open a browser and visit localhost:8000.
6. Enable Geolocation to get your current location.


### Frameworks, Libraries and APIs 
1. [Knockout MVVM framework](http://knockoutjs.com/): used to handle the list and filter. 
2. [jQuery](http://api.jquery.com/jquery.getjson/): used to make AJAX requet to Foursquare API.
3. [Jasny Bootstrap](http://www.jasny.net/bootstrap/): used to create off-canvas navigation menu and make the page responsive.
4. [Google Maps API](https://developers.google.com/maps/): used to handle the map, markers and events.
5. [Foursquare API](https://developer.foursquare.com/start): used to get place information via HTTP GET method.


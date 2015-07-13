'use strict';

var map;
var initialize = function() {
  var mapCanvas = document.getElementById('map-canvas');
  map = new google.maps.Map(mapCanvas, {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
};

google.maps.event.addDomListener(window, 'load', initialize);


(function(Models, Views, Services) {
  $(document).ready(function() {


    var uwAPI = new ServiceModule.UWaterlooService();
    console.log(uwAPI);
    //uwAPI.queryBuildings(alert);
  });
})(ModelModule, ViewModule, ServiceModule);

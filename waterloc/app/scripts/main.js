'use strict';



(function(Models, Views, Services, Secrets) {
  $(document).ready(function() {
    var uwAPI = new ServiceModule.UWaterlooService(SecretsModule.uwDataKey);

    var map;
    var map_init = function(dcLocation) {

      var mapCanvas = document.getElementById('map-canvas');
      map = new google.maps.Map(mapCanvas, {
        zoom: 15,
        center: {lat: dcLocation.data['latitude'], lng: dcLocation.data['longitude']}
      });
    };

    var dc = uwAPI.getBuilding('DC', map_init);

  });
})(ModelModule, ViewModule, ServiceModule, SecretsModule);

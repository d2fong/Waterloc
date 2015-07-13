'use strict';



var data = {
  "building_id":"37",
      "building_code":"DC",
      "building_name":"William G. Davis Computer Research Centre",
      "building_parent":"",
      "alternate_names":[
    "Davis Centre"
  ],
      "latitude":43.472761,
      "longitude":-80.542164,
      "building_sections":[

  ],
      "building_outline":[

  ]
};


(function(Models, Views, Services, Secrets) {
  $(document).ready(function() {
    // Create the service, models, views
    var uWService = new ServiceModule.UWaterlooService(SecretsModule.uwDataKey);
    var buildingsListModel = new ModelModule.BuildingListModel();
    var mapCanvas = document.getElementById('map-canvas');
    var mapModel = new google.maps.Map(mapCanvas);


    var model = {
      'mapModel': mapModel,
      'buildingListModel': buildingsListModel
    };


    var buildingsListView = new ViewModule.BuildingListView(buildingsListModel, uWService);
    var mapView = new ViewModule.MapView(model, uWService);




    // Add jquery controls here
    // pseduo code for updating a model

    //building elemnts = getbuildingelements():
    //for element in building_elements:
    //  add event listener for element:
    //    on element click:
    //      element.update(clicked)



  });
})(ModelModule, ViewModule, ServiceModule, SecretsModule);

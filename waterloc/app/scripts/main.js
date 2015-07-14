'use strict';


var data = {
  "building_id": "37",
  "building_code": "DC",
  "building_name": "William G. Davis Computer Research Centre",
  "building_parent": "",
  "alternate_names": [
    "Davis Centre"
  ],
  "latitude": 43.472761,
  "longitude": -80.542164,
  "building_sections": [],
  "building_outline": []
};


(function (Models, Views, Services, Secrets) {
  $(document).ready(function () {
    // Create the service, models, views
    var uWService = new ServiceModule.UWaterlooService(SecretsModule.uwDataKey);
    var buildingsListModel = new ModelModule.BuildingListModel();

    var mapCanvas = document.getElementById('map-canvas');
    var mapModel = new google.maps.Map(mapCanvas);


    var model = {
      'mapModel': mapModel,
      'buildingListModel': buildingsListModel
    };



    var buildingsListPanel = document.getElementById('building-list-entries');
    var buildingsListView = new ViewModule.BuildingListView(buildingsListModel, uWService);
    buildingsListView.setBuildingListPanel(buildingsListPanel);
    var mapView = new ViewModule.MapView(model, uWService);


    var init = function (callback) {
      var initializeMap = function (DCResponseData) {
        var lat = DCResponseData.latitude;
        var lng = DCResponseData.longitude;
        mapView.getMapModel().setCenter(new google.maps.LatLng(lat, lng));
        mapView.getMapModel().setZoom(15);
      };

      mapView.getService().getBuilding("DC", initializeMap);


      var initializeBuildings = function (buildingListData) {
        _.each(buildingListData, function (building) {
          var data = {
            'name': building.building_name,
            'id': building.id,
            'code': building.building_code,
            'altNames': building.alternate_names,
            'lat': building.latitude,
            'lng': building.longitude
          };
          if ((data.lat != null) && (data.lng != null)) {
            var b = new ModelModule.BuildingModel(data.name,
              data.id, data.code, data.altNames, data.lat, data.lng);
            buildingsListModel.addBuilding(b);
          }
        });

          callback();
      };

      buildingsListView.getService().queryBuildings(initializeBuildings);


    };

    var controllerInit = function () {
        $('.building-entry').children('input').change(function() {
          if ($(this).is(':checked')) {
            $(this).parent()[0].className = 'list-group-item building-entry ' + 'selected';
            var code = $(this).attr('id');
            var b = buildingsListModel.getBuilding(code);
            b.update(ModelModule.BUILDING_SHOW);

          } else {
            $(this).parent()[0].className = 'list-group-item building-entry';
            var code = $(this).attr('id');
            var b = buildingsListModel.getBuilding(code);
            b.update(ModelModule.BUILDING_HIDE);

          }
        });
    };

    init(controllerInit);

    // Add jquery controls here
    // pseduo code for updating a model

    //building elemnts = getbuildingelements():
    //for element in building_elements:
    //  add event listener for element:
    //    on element click:
    //      element.update(clicked)

  });
})(ModelModule, ViewModule, ServiceModule, SecretsModule);

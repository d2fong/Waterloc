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


        var buildingsListView = new ViewModule.BuildingListView(buildingsListModel, uWService);
        var mapView = new ViewModule.MapView(model, uWService);


        var init = function(callback) {
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
                        'lng': building.longitutde
                    };
                    buildingsListModel.addBuilding(new ModelModule.BuildingModel(data.name, data.id, data.code, data.altNames, data.latitude, data.longitude));

                });

                callback();
            };

            buildingsListView.getService().queryBuildings(initializeBuildings);


        };

        var appLoop = function() {
            console.log("HELLO WORLD");
            console.log(buildingsListModel);
        };

        init(appLoop);

        // Add jquery controls here
        // pseduo code for updating a model

        //building elemnts = getbuildingelements():
        //for element in building_elements:
        //  add event listener for element:
        //    on element click:
        //      element.update(clicked)

    });
})(ModelModule, ViewModule, ServiceModule, SecretsModule);

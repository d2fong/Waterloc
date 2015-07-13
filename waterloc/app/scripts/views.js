'use strict';

/* exported ViewModule */
/* The above comment disables the JSHint warning of ViewModule being defined but not used. */

var ViewModule = (function(BuildingModel) {

  var BuildingListView = function(model, UWaterlooService) {
    this.setModel(model);
    this.setService(UWaterlooService);
  };

  _.extend(BuildingListView.prototype, {

    setModel: function(model) {
      this.model = model;
      this.model.addListener(this);
    },
    getModel: function() {
      return this.model;
    },
    setService: function(service) {
      this.UWaterlooService = service;
    },
    getService: function() {
      return this.UWaterlooService;
    },
    getBuildingsData: function (){
      this.UWaterlooService.queryBuildings(this.init);
    },
    //init: function (buildingListData) {
    //  _.each(buildingListData, function (building) {
    //    var data = {
    //      'name': building.building_name,
    //      'id': building.id,
    //      'code': building.building_code,
    //      'altNames': building.alternate_names,
    //      'lat': building.latitude,
    //      'lng': building.longitutde
    //    };
    //    this.getModel().addBuilding(new BuildingModel(data.name, data.id, data.code, data.altNames, data.lat, data.lng));
    //
    //  });
    //},
    update: function(event) {
      if (event.event == ModelModule.BUILDING_SHOW) {
        // update the list of buildings panel and highlight the corresponding building
      } else if (event.event == ModelModule.BUILDING_HIDE) {
        // update the list of buildings panel and un-highlight the corresponding building
      }
    }
  });


  var MapView = function(model, UWaterlooService) {
    this.setMapModel(model.mapModel);
    this.setBuildingListModel(model.buildingListModel);
    this.setService(UWaterlooService);


  };

  _.extend(MapView.prototype, {
    setMapModel: function(mapModel) {
      this.mapModel = mapModel;
    },
    setBuildingListModel: function(buildingListModel) {
      this.buildingListModel = buildingListModel;
      this.buildingListModel.addListener(this);
    },
    getMapModel: function() {
      return this.mapModel;
    },
    getBuildingListModel: function() {
      return this.buildingListModel;
    },
    setService: function(service) {
      this.UWaterlooService = service;
    },
    getService: function() {
      return this.UWaterlooService;
    },

    //getDCLocation: function() {
    //  this.UWaterlooService.getBuilding("DC", this.init);
    //},
    //init: function(DCResponseData) {
    //  var lat = DCResponseData.latitude;
    //  var lng = DCResponseData.longitude;
    //
    //  this.getMapModel().setCenter(new google.maps.LatLng(lat, lng));
    //  this.getMapModel().mapModel.setZoom(15);
    //},
    update: function(event) {

    }
  });

  return {
    BuildingListView: BuildingListView,
    MapView: MapView
  };
})(ModelModule.BuildingModel);

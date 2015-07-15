'use strict';

/* exported ViewModule */
/* The above comment disables the JSHint warning of ViewModule being defined but not used. */

var ViewModule = (function (BuildingModel) {

  var BuildingListView = function (model, UWaterlooService) {
    this.setModel(model);
    this.setService(UWaterlooService);
  };

  _.extend(BuildingListView.prototype, {

    setModel: function (model) {
      this.model = model;
      this.model.addListener(this);
    },
    getModel: function () {
      return this.model;
    },
    setService: function (service) {
      this.UWaterlooService = service;
    },
    getService: function () {
      return this.UWaterlooService;
    },
    getBuildingsData: function () {
      this.UWaterlooService.queryBuildings(this.init);
    },
    setBuildingListPanel: function(el) {
      this.buildingListPanel = el;
    },
    getBuildingListPanel: function() {
      return this.buildingListPanel;
    },

    update: function (event) {
      if (event.event == ModelModule.BUILDING_SHOW) {
        // update the list of buildings panel and highlight the corresponding building
      } else if (event.event == ModelModule.BUILDING_HIDE) {
        // update the list of buildings panel and un-highlight the corresponding building
      } else if (event.event == ModelModule.BUILDING_ADDED) {
        this.renderBuilding(event.building);
      } else if (event.event == ModelModule.BUILDING_FILTER) {
        this.renderBuildings(event.buildings);
      }
    },
    renderBuilding: function (building) {
      var buildingListElements = this.getBuildingListPanel();
      var entryContainer = document.createElement('div');
      var entryLabel = document.createElement('label');
      entryLabel.htmlFor = building.code;
      entryLabel.innerText = building.name;

      var frontCheck = document.createElement('input');
      frontCheck.type = 'checkbox';
      frontCheck.id = building.code;
      if (building.isSelected) {
        frontCheck.checked = true;
        entryContainer.className = 'list-group-item building-entry selected';
      } else {
        entryContainer.className = 'list-group-item building-entry';
        frontCheck.checked = false;
      }
      frontCheck.val = 0;
      frontCheck.class = 'check';


      entryContainer.appendChild(frontCheck);
      entryContainer.appendChild(entryLabel);
      buildingListElements.appendChild(entryContainer);
    },
    renderBuildings: function(buildings) {
      var panel = this.getBuildingListPanel();
      while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
      }
      if (buildings.length > 0) {
        for (var i = 0; i < buildings.length; i++) {
          this.renderBuilding(buildings[i]);
        }
      }
    }


  });


  var MapView = function (model, UWaterlooService) {
    this.setMapModel(model.mapModel);
    this.setBuildingListModel(model.buildingListModel);
    this.setService(UWaterlooService);
    this.mapMarkers = [];


  };

  _.extend(MapView.prototype, {
    setMapModel: function (mapModel) {
      this.mapModel = mapModel;
    },
    setBuildingListModel: function (buildingListModel) {
      this.buildingListModel = buildingListModel;
      this.buildingListModel.addListener(this);
    },
    getMapModel: function () {
      return this.mapModel;
    },
    getBuildingListModel: function () {
      return this.buildingListModel;
    },
    setService: function (service) {
      this.UWaterlooService = service;
    },
    getService: function () {
      return this.UWaterlooService;
    },

    update: function (event) {
      //console.log(event);
      if (event.event == ModelModule.BUILDING_SHOW) {
        var latLong = new google.maps.LatLng(event.building.lat, event.building.lng);
        var marker = new google.maps.Marker({
          position: latLong,
          map: this.mapModel,
          title: event.building.name
        });
        var id = event.building.code;
        this.mapMarkers.push({'id': id, 'marker': marker});
      } else if (event.event == ModelModule.BUILDING_HIDE) {

        var m = _.findWhere(this.mapMarkers, {id: event.building.code});
        if (m != undefined) {
          m.marker.setMap(null);
          this.mapMarkers = _.without(this.mapMarkers, m);
        }
      }
    }

  });

  return {
    BuildingListView: BuildingListView,
    MapView: MapView
  };
})(ModelModule.BuildingModel);

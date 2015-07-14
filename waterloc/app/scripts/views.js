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

        update: function (event) {
            if (event.event == ModelModule.BUILDING_SHOW) {
                // update the list of buildings panel and highlight the corresponding building
            } else if (event.event == ModelModule.BUILDING_HIDE) {
                // update the list of buildings panel and un-highlight the corresponding building
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
            if (event.event == ModelModule.BUILDING_SHOW) {
                var latLong = new google.maps.LatLng(event.building.lat, event.building.lng);
                var marker = new google.maps.Marker({
                    position: latLong,
                    map: this.mapModel,
                    title: building.name
                });
                var id = event.building.building_code;
                this.mapMarkers.push({'id': id, 'marker': marker});
            } else if (event.event == ModelModule.BUILDING_HIDE) {
                var m = _.findWhere(this.mapMarkers, {id:event.building.building_code});
                if (m != undefined) {
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

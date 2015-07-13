'use strict';

/* exported ViewModule */
/* The above comment disables the JSHint warning of ViewModule being defined but not used. */

var ViewModule = (function(BuildingModel) {

  var AbstractView = function(model) {
    this.model = model;
    this.model.addListener(this);
  };

  _.extend(AbstractView.prototype, {
    init: function() {

    }, 

    update: function(event) {

    },


  });

  var BuildingListView = function(model, UWaterlooService) {
    AbstractView.apply(this, arguments); 
    this.UWaterlooService = UWaterlooService;
    this.init();
  };

  _.extend(BuildingListView.prototype, AbstractView.prototype, {

  });

  var MapView = function(model, UWaterlooService) {
    AbstractView.apply(this, arguments);
    this.UWaterlooService = UWaterlooService;
    this.init();
  };

  _.extend(MapView.prototype, AbstractView.prototype, {

  });

  return {
    BuildingListView: BuildingListView,
    MapView: MapView
  };
})(ModelModule.BuildingModel);

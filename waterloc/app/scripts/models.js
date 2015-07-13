'use strict'; 

/* exported ModelModule */
/* The above comment disables the JSHint warning of ModelModule being defined but not used. */

var ModelModule = (function() {
  var AbstractModel = function() {
    this.listeners = [];
  };


  _.extend(AbstractModel.prototype, {
    addListener: function(listener) {
      if (_.indexOf(this.listeners, listener) == -1) {
        this.listeners.push(listener);
      }
    },

    removeListener: function(listener) {
      this.listeners = _.without(this.listeners, listener);
    },

    notify: function(event) {
      _.each(this.listeners, function(listener) {
        // The view will be the primary listener to each graph node, hence we call its update function when this model changes
        listener.update(event);
      });
    },

    update: function(event) {
    }
  });


  var BUILDING_CLICKED = 'BUILDING_CLICKED';
  var BUILDING_SHOW = 'BUILDING_SHOW';
  var BUILDING_HIDE = 'BUILDING_HIDE';
  var BUILDING_ADDED = 'BUILDING_ADDED';
  var BUILDING_REMOVED = 'BUILDING_REMOVED';

  var BuildingModel = function(name, id, code, altNames, lat, long) {
    AbstractModel.apply(this, arguments);
    this.name = name;
    this.id = id;
    this.code = code;
    this.altNames = altNames;
    this.lat = lat;
    this.long = long;
    this.isSelected = false;
  };

  _.extend(BuildingModel.prototype, AbstractModel.prototype, {
    update: function(event) {
      if (event == BUILDING_CLICKED) {
        if (this.isSelected == false) {
          this.isSelected = true;
          this.notfiy({'building': self, 'event': BUILDING_SHOW});
        } else {
          this.isSelected = false;
          this.notify({'building': self, 'event': BUILDING_HIDE});
        }
      }
    }
  });


  var BuildingListModel = function() {
    AbstractModel.apply(this, arguments);
    this.buildings = [];
  };

  _.extend(BuildingListModel.prototype, AbstractModel.prototype, {
    addBuilding: function(building) {
      if (_.indexOf(this.buildings, building) == -1) {
        building.addListener(self);
        this.buildings.push(building);
        this.notify(BUILDING_ADDED);
      }
    },
    removeBuilding: function(building) {
      var index = _.indexOf(this.buildings, building);
      if (index > -1) {
        this.buildings[index].removeListener(self);
        this.buildings = _.without(this.buildings, this.buildings[index]);
        this.notify(BUILDING_REMOVED);
      }
    },
    update: function(event) {
      this.notify(event);
    }
  });

  return {
    BuildingModel: BuildingModel,
    BuildingListModel: BuildingListModel,
    BUILDING_CLICKED: BUILDING_CLICKED,
    BUILDING_SHOW: BUILDING_SHOW,
    BUILDING_HIDE: BUILDING_HIDE,
    BUILDING_ADDED: BUILDING_ADDED,
    BUILDING_REMOVED: BUILDING_REMOVED
  };
})();
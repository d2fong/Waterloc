'use strict';

/* exported ModelModule */
/* The above comment disables the JSHint warning of ModelModule being defined but not used. */

var ModelModule = (function () {
    var AbstractModel = function () {
        this.listeners = [];
    };


    _.extend(AbstractModel.prototype, {
        addListener: function (listener) {
            if (_.indexOf(this.listeners, listener) === -1) {
                this.listeners.push(listener);
            }
        },

        removeListener: function (listener) {
            this.listeners = _.without(this.listeners, listener);
        },

        notify: function (event) {
          _.each(this.listeners, function (listener) {
                // The view will be the primary listener to each graph node, hence we call its update function when this model changes
              listener.update(event);
            });
        }
    });


    var BUILDING_CLICKED = 'BUILDING_CLICKED';
    var BUILDING_SHOW = 'BUILDING_SHOW';
    var BUILDING_HIDE = 'BUILDING_HIDE';
    var BUILDING_ADDED = 'BUILDING_ADDED';
    var BUILDING_REMOVED = 'BUILDING_REMOVED';
    var BUILDING_FILTER = 'BUILDING_FILTER';

    var BuildingModel = function (name, id, code, altNames, lat, long) {
        this.listeners = [];
        this.name = name;
        this.id = id;
        this.code = code;
        this.altNames = altNames;
        this.lat = lat;
        this.lng = long;
        this.isSelected = false;
    };

    _.extend(BuildingModel.prototype, {
        update: function (event) {
          if (event === BUILDING_SHOW) {
            this.isSelected = true;
            this.notify({'building': this, 'event': BUILDING_SHOW});
          } else if (event === BUILDING_HIDE) {
            this.isSelected = false;
            this.notify({'building': this, 'event': BUILDING_HIDE});
          }
        },
      addListener: function (listener) {
        if (_.indexOf(this.listeners, listener) === -1) {
          this.listeners.push(listener);
        }
      },

      removeListener: function (listener) {
        this.listeners = _.without(this.listeners, listener);
      },

      notify: function (event) {
        _.each(this.listeners, function (listener) {
          // The view will be the primary listener to each graph node, hence we call its update function when this model changes
          listener.update(event);
        });
      }

    });


    var BuildingListModel = function () {
        AbstractModel.apply(this, arguments);
        this.buildings = [];
    };

    _.extend(BuildingListModel.prototype, AbstractModel.prototype, {
        addBuilding: function (building) {
            if (_.indexOf(this.buildings, building) === -1) {
                building.addListener(this);
                this.buildings.push(building);
                this.notify({'building': building, 'event': BUILDING_ADDED});
            }
        },
        removeBuilding: function (building) {
            var index = _.indexOf(this.buildings, building);
            if (index > -1) {
                this.buildings[index].removeListener(this);
                this.buildings = _.without(this.buildings, this.buildings[index]);
                this.notify({'building': building, 'event': BUILDING_REMOVED});
            }
        },
        update: function (event) {
          if (event.event === BUILDING_FILTER) {
            var reg = event.regex;
            var buildingSubset = [];
            for (var i = 0; i < this.buildings.length; i++) {
              if (this.buildings[i].name.match(reg) !== null) {
                buildingSubset.push(this.buildings[i]);
              }
            }
            this.notify({'event': event.event, 'buildings': buildingSubset});
          } else {
            this.notify(event);
          }
        },
      getBuilding: function(code) {
        var b = _.findWhere(this.buildings, {'code': code});
        if (b < 0) {
          return null;
        }
        return b;
      },
    });

    return {
        BuildingModel: BuildingModel,
        BuildingListModel: BuildingListModel,
        BUILDING_CLICKED: BUILDING_CLICKED,
        BUILDING_SHOW: BUILDING_SHOW,
        BUILDING_HIDE: BUILDING_HIDE,
        BUILDING_ADDED: BUILDING_ADDED,
        BUILDING_REMOVED: BUILDING_REMOVED,
      BUILDING_FILTER: BUILDING_FILTER
    };
})();

'use strict'; 

/* exported ModelModule */
/* The above comment disables the JSHint warning of ModelModule being defined but not used. */

var ModelModule = (function() {
  var AbstractModel = function() {
    this.listeners = [];
  };


  _.extend(AbstractModel.prototype, {
    addListener: function(listener) {

    },

    removeListener: function(listener) {

    },

    notify: function(event) {

    },

    update: function(event) {

    }
  });



  var BuildingModel = function(name, id, code) {
    AbstractModel.apply(this, arguments);

  };

  _.extend(BuildingModel.prototype, AbstractModel.prototype, {

  });




  var BuildingListModel = function() {
    AbstractModel.apply(this, arguments);

  };

  _.extend(BuildingListModel.prototype, AbstractModel.prototype, {

  });

  return {
    BuildingModel: BuildingModel,
    BuildingListModel: BuildingListModel
  };
})();
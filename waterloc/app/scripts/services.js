'use strict'; 

/* exported ServiceModule */
/* The above comment disables the JSHint warning of ServiceModule being defined but not used. */

var ServiceModule = (function() {

  var UWaterlooService = function() {
    this.key = '';
    this.urlPrefix = 'https://api.uwaterloo.ca/v2';
  };


  _.extend(UWaterlooService.prototype, {
    queryBuildings: function() {

    },

    getBuilding: function(buildingCode) {

    }
  });


  return {
    UWaterlooService: UWaterlooService,
  };

})();





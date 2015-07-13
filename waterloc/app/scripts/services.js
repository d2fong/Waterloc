'use strict'; 

/* exported ServiceModule */
/* The above comment disables the JSHint warning of ServiceModule being defined but not used. */

var ServiceModule = (function() {

  var cache = {};

  var UWaterlooService = function(apiKey) {
    this.apiKey = apiKey;
    this.urlPrefix = 'https://api.uwaterloo.ca/v2/';
  };

  var getBuildingListUrl =  function(prefix, key) {
    return prefix + 'buildings/list.json' + '?key=' + key;
  };
  var getBuildingCodeUrl =  function(prefix, code, key) {
    return prefix + 'buildings/' + code + '.json' + '?key=' + key;
  };


  _.extend(UWaterlooService.prototype, {
    queryBuildings: function(callback) {
      if ("building_list" in cache) {
        return cache['building_list'];
      } else {
        $.ajax({
          method: "GET",
          url: getBuildingListUrl(this.urlPrefix,this.apiKey)
        }).success(function(response) {
          cache.building_list = response['data'];
          callback(response);
          return response['data'];
        }).error(function() {
          return undefined;
        });
      }

    },

    getBuilding: function(buildingCode, callback) {
      if (buildingCode in cache) {
        return cache[buildingCode];
      } else {
        $.ajax({
          method: "GET",
          url: getBuildingCodeUrl(this.urlPrefix, buildingCode, this.apiKey)
        }).success(function(response) {
          cache.buildingCode = response['data'];
          callback(response);
          return response;
        }).error(function() {
          console.log("ERROR");
          return undefined;
        });
      }
    }
  });


  return {
    UWaterlooService: UWaterlooService
  };

})();





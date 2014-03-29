'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('onlyNonNumericFilter', function() {
    return function(array) {
      var retVal = new Array();
      for(var i in array){
        if(array[i].type == "string"){
          retVal.push(array[i]);
        }
      }
      return retVal;
    }
  }).
  filter('onlyNumericFilter', function() {
    return function(array) {
      var retVal = new Array();
      for(var i in array){
        if(array[i].type == "numeric"){
          retVal.push(array[i]);
        }
      }
      return retVal;
    }
  })
;

'use strict';

var moduleForControllers = angular.module('myApp.controllers');

moduleForControllers.controller('FileOpenController', ['$scope', function($scope) {
}]);

var FileOpenControllerFunction = function($scope, $modalInstance) {
  $scope.cancel = function(){
    $modalInstance.close();
  }
  $scope.openTheFile = function(theFile) {
    readFile(theFile)
    $modalInstance.close();
  }
}

/* Functions */
function mergeDataWithSettings($scope) {
  debugOutput($scope, buildTestConfig());
  readFile($scope.param.file);
}

function debugOutput($scope, msg) {
  $scope.object1 = msg;
}

function buildTestConfig() {
  var obj = new Object();
  obj.columns = new Array();
  obj.columns[0] = "uno";
  obj.columns[1] = "dos";
  obj.rows = new Array();
  obj.rows[0] = "filalaa";
  return obj;
}

function readFile(fileRef, callback) {
  var reader = new FileReader();
  // Closure to capture the file information.
  reader.onloadend = (function(fileRef) {
    return function(e) {
      alert(CSVToArray(e.target.result, ",")[0].length);
      alert(CSVToArray(e.target.result, ","));
    };
  })(fileRef);

  reader.readAsText(fileRef);
}

//I got this from http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = (strDelimiter || ",");

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp((
  // Delimiters.
  "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

  // Quoted fields.
  "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

  // Standard fields.
  "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while (arrMatches = objPattern.exec(strData)) {

    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {

      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);

    }

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {

      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[2].replace(
      new RegExp("\"\"", "g"), "\"");

    } else {

      // We found a non-quoted value.
      var strMatchedValue = arrMatches[3];

    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return (arrData);
}
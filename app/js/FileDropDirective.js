'use strict';

var moduleForDirectives = angular.module('myApp.directives');

moduleForDirectives.directive('fileDropzone', ['$rootScope', 'dataCommunicatorService', 'databaseService', function($rootScope, dataCommunicatorService, databaseService) {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '='
    },
    link: function(scope, element, attrs) {
      var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes, processDrop;
      processDragOverOrEnter = function(event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };
      processDrop = function(event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        file = event.dataTransfer.files[0];
        readFile(file, dataCommunicatorService, databaseService, $rootScope);
        return true;
      };
      validMimeTypes = attrs.fileDropzone;
      checkSize = function(size) {
        /*var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }*/
        return true;
      };
      isTypeValid = function(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > - 1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      element.bind('drop', processDrop);
    }
  };
}]);


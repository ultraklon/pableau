'use strict';

var moduleForDirectives = angular.module('myApp.directives');

moduleForDirectives.directive('fileDropzone', function() {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '='
    },
    link: function(scope, element, attrs) {
      var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
      processDragOverOrEnter = function(event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
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
      return element.bind('drop', function(event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        file = event.dataTransfer.files[0];
        alert("sasadsads");
        return true;
      });
    }
  };
});

moduleForDirectives.directive('file', function() {
  return {
    scope: {
      file: '='
    },
    link: function(scope, el, attrs) {
      el.bind('change', function(event) {
        var files = event.target.files;
        var file = files[0];
        scope.file = file ? file: undefined;
        scope.$apply();
      });
    }
  };
});


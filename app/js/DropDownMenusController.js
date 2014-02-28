var moduleForControllers = angular.module('myApp.controllers');

moduleForControllers.controller('DropdownFile', ['$scope', '$modal', function($scope, $modal) {
  $scope.items = [{
    label: "Open",
    action: function() {
      var $modalInstance=$modal.open({
        templateUrl: 'myModalContent.html',
        controller: FileOpenControllerFunction,
        resolve: {}
      });
    }
  }];
}]);


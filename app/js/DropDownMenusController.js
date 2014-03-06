var moduleForControllers = angular.module('myApp.controllers');

moduleForControllers.controller('DropdownFile', ['$scope', '$modal', 'dataCommunicatorService', function($scope, $modal, dataCommunicatorService) {
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


var moduleForControllers = angular.module('myApp.controllers');

moduleForControllers.controller('DropdownFile', ['$scope', function($scope) {
  $scope.items = [
    "Open"
  ];
}]);

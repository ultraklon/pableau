'use strict';

var moduleForControllers = angular.module('myApp.controllers');
moduleForControllers.controller('NonNumericColumnController', ['$scope', 'dataCommunicatorService', function($scope, dataCommunicatorService) {
  $scope.dataCommunicator = dataCommunicatorService.content;
}]);


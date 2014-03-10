var moduleForServices = angular.module('myApp.services');

moduleForServices.factory('dataCommunicatorService', function(){
  var obj = new Object();
  obj.content = new Object();
  obj.content.candidateFields = new Array();
  obj.content.columnFields = new Array();
  obj.content.rowFields = new Array();
  return obj;
});

var moduleForServices = angular.module('myApp.services');

moduleForServices.factory('dataCommunicatorService', function(){
  var obj = new Object();
  obj.content = new Object();
  obj.content.fields = new Array();
  return obj;
});

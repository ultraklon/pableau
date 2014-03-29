var moduleForServices = angular.module('myApp.services');

moduleForServices.factory('dataCommunicatorService', function(){
  var obj = new Object();
  obj.byteSize = 0;
  obj.filename = '';
  obj.content = new Object();
  obj.content.candidateFields = new Array();
  obj.content.candidateNumericFields = new Array();
  obj.content.candidateNonNumericFields = new Array();
  obj.content.columnFields = new Array();
  obj.content.rowFields = new Array();
  return obj;
});

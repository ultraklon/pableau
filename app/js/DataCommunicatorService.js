var moduleForServices = angular.module('myApp.services');

moduleForServices.factory('dataCommunicatorService', function() {
  return {
    byteSize: 0,
    filename: '',
    graphicType: '',
    content: {
      candidateFields: [],
      candidateNumericFields: [],
      candidateNonNumericFields: [],
      columnFields: [],
      rowFields: []
    },
    chart: {}
  }
});

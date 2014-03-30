'use strict';

var chart;

var moduleForControllers = angular.module('myApp.controllers');
moduleForControllers.controller('GoogleGraphController', ['$scope', 'dataCommunicatorService', function($scope, dataCommunicatorService) {
  $scope.mostrar=function(){ drawChart(dataCommunicatorService) };

}]);

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(setGraphic);

function setGraphic(){
  chart = new google.visualization.BarChart(document.getElementById('chart_div'));
}

function drawChart(dataCommunicatorService) {
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,400],
    ['2005',  1170,460],
    ['2006',  660, 1120],
    ['2007',  1030,540]
  ]);

  chart.draw(data, prepareOptions(dataCommunicatorService));
}

function prepareOptions(data){
  var options = {
    title: 'Company Performance' + data.content.columnFields[0].name,
    vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
  };
  return options;
}

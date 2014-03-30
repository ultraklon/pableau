'use strict';

var chart;

var moduleForControllers = angular.module('myApp.controllers');
moduleForControllers.controller('GoogleGraphController', ['$scope', 'dataCommunicatorService', function($scope, dataCommunicatorService) {
  $scope.mostrar=function(){ $scope.chart.options.title="jojojo" };
  $scope.chart=dataCommunicatorService.chart;
  go($scope);
}]);

function go($scope){
    var chart1 = {};
    chart1.type = "ColumnChart";
    chart1.cssStyle = "height:200px; width:300px;";
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "laptop-id", label: "Laptop", type: "number"},
        {id: "desktop-id", label: "Desktop", type: "number"},
        {id: "server-id", label: "Server", type: "number"},
        {id: "cost-id", label: "Shipping", type: "number"}
    ], "rows": [
        {c: [
            {v: "January"},
            {v: 19, f: "42 items"},
            {v: 12, f: "Ony 12 items"},
            {v: 7, f: "7 servers"},
            {v: 4}
        ]},
        {c: [
            {v: "February"},
            {v: 13},
            {v: 1, f: "1 unit (Out of stock this month)"},
            {v: 12},
            {v: 2}
        ]},
        {c: [
            {v: "March"},
            {v: 24},
            {v: 0},
            {v: 11},
            {v: 6}

        ]}
    ]};

    chart1.options = {
        "title": "Sales per month",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Sales unit", "gridlines": {"count": 6}
        },
        "hAxis": {
            "title": "Date"
        }
    };

    chart1.formatters = {};

    $scope.chart = chart1;
}
/*google.load("visualization", "1", {packages:["corechart"]});
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
}*/

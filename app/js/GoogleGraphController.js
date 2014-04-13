'use strict';

var chart;
var dataCommLocal;
var scopeLocal;

var moduleForControllers = angular.module('myApp.controllers');
moduleForControllers.controller('GoogleGraphController', ['$scope', 'dataCommunicatorService', 'databaseService', function($scope, dataCommunicatorService, databaseService) {
  $scope.mostrar=function(){
  }
  $scope.chart = dataCommunicatorService.chart;
  $scope.$watchCollection('dataCommunicator.columnFields', function (newValue, oldValue) {
    tmpSetParams(dataCommunicatorService);
    recalculteGraphic($scope, dataCommunicatorService, databaseService);
    return $scope.dataCommunicator.columnFields;
  });
  $scope.$watchCollection('dataCommunicator.rowFields', function (newValue, oldValue) {
    tmpSetParams(dataCommunicatorService);
    recalculteGraphic($scope, dataCommunicatorService, databaseService);
    return $scope.dataCommunicator.rowFields;
  });
  dataCommLocal = dataCommunicatorService;
  scopeLocal = $scope;
  go($scope);
  $scope.showingChart = true;
  $scope.showingMessage = false;
  $scope.chartMessage = "";
}]);

function tmpSetParams(dataCommunicatorService){
  dataCommunicatorService.graphicType="ColumnChart";
}

function recalculteGraphic($scope, dataCommunicatorService, databaseService){
  $scope.chart = {};
  recalculate($scope, dataCommunicatorService, databaseService);
}

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

function decideIfValidParams($scope, dataCommunicator){
  $scope.showingChart = true;
  $scope.showingMessage = false;
  $scope.chartMessage = "";
  return true;
  var gt = graphicTypes[dataCommunicator.graphicType];
  if(!gt){
    failInvalidParams($scope, "Invalid Graphic Type");
    return false;
  }

  if(gt.minRows>dataCommunicator.content.rowFields.length){
    failInvalidParams($scope, "Please, select at least " + gt.minRows + " rows");
    return false;
  }

  if(gt.minCols>dataCommunicator.content.columnFields.length){
    failInvalidParams($scope, "Please, select at least " + gt.minCols + " columns");
    return false;
  }

  if(gt.maxRows<dataCommunicator.content.rowFields.length){
    failInvalidParams($scope, "Please, don't select more than  " + gt.maxRows + " rows");
    return false;
  }

  if(gt.maxCols<dataCommunicator.content.columnFields.length){
    failInvalidParams($scope, "Please, don't select more than  " + gt.maxCols + " columns");
    return false;
  }



  $scope.showingChart = true;
  $scope.showingMessage = false;
  $scope.chartMessage = "";
  return true;
}

function failInvalidParams($scope, msg){
  $scope.chartMessage = msg;
  $scope.showingChart = false;
  $scope.showingMessage = true;
}

function recalculate($scope, dataCommunicator, database){
    if(!decideIfValidParams($scope, dataCommunicator)){
      return;
    }

    database.selectQuery($scope, dataCommunicator, buildChartColumnChart );
}

function buildChartColumnChart(scope, lines){
    var chart1 = {};
    chart1.type = dataCommLocal.graphicType; 
    chart1.cssStyle = "height:800px; width:1000px;";
    chart1.data = new Object();
    chart1.data["cols"] = new Array();
    var currentReferenceItem = new Object();
    currentReferenceItem.id = dataCommLocal.content.columnFields[0].name; 
    currentReferenceItem.label = dataCommLocal.content.columnFields[0].name; 
    currentReferenceItem.type = "string";
    chart1.data.cols.push(currentReferenceItem);
    var rows = distinct(extractColumn(lines, dataCommLocal.content.rowFields[0].name));
    for(var rr in rows){
      currentReferenceItem = new Object();
      currentReferenceItem.id = rows[rr] + '-id'; 
      currentReferenceItem.label= rows[rr]; 
      currentReferenceItem.type = "number";
      chart1.data.cols.push(currentReferenceItem);
    }
    
    /*
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "laptop-id", label: "Laptop", type: "number"},
        {id: "desktop-id", label: "Desktop", type: "number"},
        {id: "server-id", label: "Server", type: "number"},
        {id: "cost-id", label: "Shipping", type: "number"}
    ], "rows": [
      */  
    /*var cols = distinct(extractColumn(lines, dataCommLocal.content.columnFields[0].name));
    console.log("cols: " + JSON.stringify(cols));
    var rows = distinct(extractColumn(lines, dataCommLocal.content.rowFields[0].name));
    console.log("rows: " + JSON.stringify(rows));*/
    chart1.data["rows"] = new Array();
    var lastColumn='no column';
    var currentObject = new Object();
    var currentItem= new Object();
    for(var l in lines){
      if(lines[l][dataCommLocal.content.columnFields[0].name] != lastColumn){
        if(lastColumn != 'no column'){
          chart1.data.rows.push(currentObject);
          currentObject = new Object();
        }
        lastColumn = lines[l][dataCommLocal.content.columnFields[0].name]
        currentObject.c = new Array();
        currentItem = new Object();
        currentItem.v = lines[l][dataCommLocal.content.columnFields[0].name];
        currentObject.c.push(currentItem);
      }
      currentItem = new Object();
      currentItem.v = lines[l]["number"];
      currentObject.c.push(currentItem);
    }
    chart1.data.rows.push(currentObject);
    /*return;
    chart1.data = {
    "rows": [
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
    chart1.data.rows = new Array();
    //chart1.data.cols[0] = {id: dataCommunicator.content.columnFields[0].name, label: dataCommunicator.content.columnFields[0].name, type: "string"};
    var cols = database.getCols(addColsToChart);
    chart1.data.cols[1] =    {id: "laptop-id", label: "Laptop1", type: "number"},
 chart1.data.cols[2] =        {id: "desktop-id", label: "Desktop", type: "number"},
 chart1.data.cols[3] =        {id: "server-id", label: "Server", type: "number"},
 chart1.data.cols[4] =        {id: "cost-id", label: "Shipping", type: "number"}
*/
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

    //scopeLocal.chart = chart1;
    console.log("chart: " + JSON.stringify(chart1));
    
    scope.chart = chart1;
    
}

var graphicTypes = new Object();
graphicTypes = new Array(); 
graphicTypes["ColumnChart"] = {
  minRows: 1,
  maxRows: 1,
  minCols: 1,
  maxCols: 1 
};

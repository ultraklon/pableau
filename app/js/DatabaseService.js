var moduleForServices = angular.module('myApp.services');

var obj = new Object();
var dataCommLocal;

moduleForServices.factory('databaseService', ['dataCommunicatorService', function(dataCommunicatorService) {
  obj.readSomeField = readSomeField;
  obj.createDatabase = function(data) {
    createDatabase(data, dataCommunicatorService)
  };
  obj.selectQuery = selectQuery;
  obj.getCols = function(callbackFunction){
    getCols(dataCommunicatorService, callbackFunction);
  };
  dataCommLocal=dataCommunicatorService;
  return obj;
}]);

function createDatabase(data, dataCommunicatorService) {
  obj.db = openDatabase('mydb', '1.0', '', dataCommunicatorService.byteSize);
  var fieldList = fieldListSeparatedByComma(dataCommunicatorService);
  obj.db.transaction(function(tx) {
    var sqlDrop = 'DROP TABLE maintable2';
    tx.executeSql(sqlDrop);
    var sqlCreate = 'CREATE TABLE maintable2 (' + fieldList + ')';
    tx.executeSql(sqlCreate);
  });
  obj.db.transaction(function(tx) {
    for (var d in data) {
      if (d > 0) {
        var isFirst = true;
        var dataList = "";
        for (var c in data[d]) {
          var cellValue = data[d][c];
          if (dataCommunicatorService.content.candidateFields[c].type == "string") {
            cellValue = "'" + cellValue + "'";
          } else if (dataCommunicatorService.content.candidateFields[c].type == "numeric") {
            if (cellValue == '') {
              cellValue = 0;
            }
          }
          dataList += (isFirst ? "": ",") + cellValue;
          isFirst = false;
        }
        if (dataList) {
          var sqlQuery = 'INSERT INTO maintable2 (' + fieldList + ') VALUES (' + dataList + ')';
          //console.log(sqlQuery);
          //          tx.executeSql(sqlQuery, null, function(transaction, error) { alert("Error1 : " + JSON.stringify(error.message)); });
          tx.executeSql(sqlQuery);
        }
      }
    }
  });
}

function fieldListSeparatedByComma(dataCommunicatorService) {
  var isFirst = true;
  var retVal = "";
  for (var column in dataCommunicatorService.content.candidateFields) {
    retVal += (isFirst ? "": ",") + dataCommunicatorService.content.candidateFields[column].name;
    isFirst = false;
  }
  return retVal;
}

function readSomeField() {
  obj.db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM maintable2', [], function(tx, results) {
      var len = results.rows.length,
      i;
      msg = "<p>Found rows: " + len + "</p>";
      for (i = 0; i < len; i++) {
        msg += results.rows.item(i).id;
      }
      alert(msg);
    });
  });
}

function getCommaSeparatedList(array){
  var retVal='';
  for(a in array){
    if(a>0){
      retVal += ", ";
    }
    retVal += array[a].name;
  }
  return retVal;
}

function getCols(dataCommunicator, callbackFunction) {
  if (obj.db) {
    obj.db.transaction(function(tx) {
      var sqlQuery = 'SELECT ' + getCommaSeparatedList(dataCommunicator.content.columnFields) + ' FROM maintable2 GROUP BY ' + getCommaSeparatedList(dataCommunicator.content.columnFields);
      console.log(sqlQuery)
      tx.executeSql(sqlQuery, [], function(tx, rs) {
        callbackFunction(rs.rows);
      });
    });
  }
  return ["uno", "dos", "tres"];
}

function selectQuery(scope, dataCommunicator, callbackFunction) {
  if(dataCommunicator.graphicType=="ColumnChart"){
    executeColumnChartQuery(scope, dataCommunicator, callbackFunction);
  }else{
    console.log("ERROR: Invalid graphic type");
  }
}

function executeColumnChartQuery(scope, dataCommunicator, callbackFunction){
  var sqlQuery =
      'SELECT '
      + ' colI.' + dataCommunicator.content.columnFields[0].name
      + ' AS ' + dataCommunicator.content.columnFields[0].name
      + ', rowI.' + dataCommunicator.content.rowFields[0].name
      + ' AS ' + dataCommunicator.content.rowFields[0].name
      + ', CASE WHEN number IS NULL THEN 0 ELSE number END AS number '
      + ' FROM '
      + '(SELECT '
      + dataCommunicator.content.columnFields[0].name
      + ' FROM maintable2) colI '
      + ' INNER JOIN '
      + '(SELECT '
      + dataCommunicator.content.rowFields[0].name
      + ' FROM maintable2) rowI '
      + ' LEFT JOIN '
      + '(SELECT '
      + dataCommunicator.content.columnFields[0].name
      + ', ' + dataCommunicator.content.rowFields[0].name
      + ', count(*) number'
      + ' FROM maintable2'
      + ' GROUP BY ' + dataCommunicator.content.columnFields[0].name
      + ', ' + dataCommunicator.content.rowFields[0].name + ') countI '
      + ' ON ('
      + ' rowI.' + dataCommunicator.content.rowFields[0].name
      + ' = countI.' + dataCommunicator.content.rowFields[0].name
      + ' AND '
      + ' colI.' + dataCommunicator.content.columnFields[0].name
      + ' = countI.' + dataCommunicator.content.columnFields[0].name
      + ') '
      + ' ORDER BY colI.' + dataCommunicator.content.columnFields[0].name
      + ', rowI.' + dataCommunicator.content.rowFields[0].name;
    executeQuery(scope, sqlQuery, callbackFunction);
}

function executeQuery(scope, sqlQuery, callbackFunction){
  console.log(sqlQuery)
  if (obj.db) {
    obj.db.transaction(function(tx) {
      tx.executeSql(sqlQuery, [], function(tx, rs) {
        var properArray = new Array();
        for(var i=0; i<rs.rows.length; i++){
          properArray.push(rs.rows.item(i));
        }
        callbackFunction(scope, properArray);
      });
    });
  }
}


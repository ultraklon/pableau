var moduleForServices = angular.module('myApp.services');

var obj = new Object();

moduleForServices.factory('databaseService', ['dataCommunicatorService', function(dataCommunicatorService) {
  obj.readSomeField = readSomeField;
  obj.createDatabase = function(data) {
    createDatabase(data, dataCommunicatorService)
  };
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
          if(dataCommunicatorService.content.candidateFields[c].type == "string"){
            cellValue = "'" + cellValue + "'";
          }else if(dataCommunicatorService.content.candidateFields[c].type == "numeric"){
            if(cellValue == ''){
              cellValue = 0;
            }
          } 
          dataList += (isFirst ? "": ",") + cellValue; 
          isFirst = false;
        }
        if (dataList) {
          var sqlQuery = 'INSERT INTO maintable2 (' + fieldList + ') VALUES (' + dataList + ')';
          console.log(sqlQuery);
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


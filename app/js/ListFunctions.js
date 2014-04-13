function extractColumn(list, columnName){
  console.log('extracting ' + columnName + " from: " + JSON.stringify(list));
  var retValue = new Array();
  for(l in list){
    retValue.push(list[l][columnName]);
  }
  return retValue;
}

function distinct(list){
  console.log('distincting: ' + JSON.stringify(list));
  var retValue = new Array();
  for(l in list){
    if(retValue.indexOf(list[l]) < 0){
      retValue.push(list[l]);
    }
  }
  return retValue;
}

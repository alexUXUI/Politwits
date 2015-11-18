module.exports = {
  hello: function(){
    return 'hello';
  },

  world: function(){
    return 'World!'
  },

  arrayLength : function(array){
    return array.length;
  },

  arrayIndex : function(array){
    return array[2] + array[2] - array[2];
  },

// ask about this ONE --> Danny, CJ, Berto
  forEachEx : function(array){
    array.forEach(function(index, item, array){
      array[index, item] = array[index, item] += 1;
    });
  return array;
  },

  forEach2 : function(array){
    var newArray = [];

    array.forEach(function(item,index,array){
      newArray.push(array[item] += 1);
    });
    return newArray;
  },
// this one works but isn't passing the test, either
  printing : function(array){
    array.forEach(function(item,index,array){
      console.log(item, index);
    });
    return array;
  },

  addToEnd : function(array1, array2){
    var result = array1.concat(array2).toString();
    return result;
  },

  removeEnd : function(array){
    array.pop(2);
    return array;
  },

  findIndexOf : function(array, n){
    var result =  Array.indexof(array[n]);
    return result;
  },
//This doesn;t pass the test either...
//what am I doing wrong?
  removeByIndex : function(array){
    var result = array.splice(0, 2).toString();
    return  result;
  },

  copyArray : function(array){
    var result = array.slice().toString();
    return result;
  },

  checkArray : function(array){
    var result = Array.isArray(array);
    return result;
  },

//   isBigEnough : function (element, index, array) {
//   return array.every(isBigEnough);
// },

//NEED TO WRITE FILTER METHOS AND MAP METHODS

}

'user strict' 

/**
 * hanges the contents of an array by removing or replacing existing elements and/or adding new elements
 * 
 * @param {Array} array The array to pop the value from.
 * @param {Function} callback The expression to evalute.
 * @returns {*} The value retrievied from the array.
 */

 function splice(array, start, deleteCount, chan) {
    var result = [];
    for (var i = 0; i < Math.min(start, array.length); i++) {
      result[result.length] = array[i];
    }
    for (var i = 3; i < arguments.length; i++) {
      result[result.length] = arguments[i];
    }
    for (var i = start + deleteCount; i < array.length; i++) {
      result[result.length] = array[i]
    }
    array.length = result.length;
    for (var i = 0; i < array.length; i++) {
      array[i] = result[i]; 
    }
    return result;
  }

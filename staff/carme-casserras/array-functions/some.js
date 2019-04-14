'user strict' 

/**
 * tests whether at least one element in the array passes the test implemented by the provided function
 * 
 * @param {Array} array The array to pop the value from.
 * @param {Function} callback The expression to evalute.
 * @returns {*} The value retrievied from the array.
 */

 function some(array, callback) {

    for (var i = 0; i < array.length; i++) {
       if (callback(array[i])) {
           return true;
        }
    }  
    return false;
} 

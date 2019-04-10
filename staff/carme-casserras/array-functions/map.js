'user strict'

/**
 * Creates a new array with the results of calling a provided function on every element in the calling array.
 * 
 * @param {Array} array The array to evaluate.
 * @param {Function} callback The expression to evalute.
 * 
 */

function map(array, callback) {
    var acum = [];
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array')
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function')
    
    for (var i = 0; i < array.length; i++) {
        acum[i] = callback(array[i]);
    } 
    return acum;
}


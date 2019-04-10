'use strict';



/**
 * Creates a new array with all elements that pass the test implemented by the provided function.
 * 
 * @param {Array} array The array to evaluate.
 * @param {Function} callback The expression to evalute.
 * 
 */

function filter(array, callback) {
    var acum = [];
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array')
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function')

    for (var i = 0; i < array.length; i++) {
        if(callback(array[i])) {
            acum[acum.length] = array[i];
        }
    }
    return acum;
}

    
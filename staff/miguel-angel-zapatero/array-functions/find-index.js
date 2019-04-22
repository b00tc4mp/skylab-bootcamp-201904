'use strict';

/**
 * Iterate an array and evaluate an expression on each of its values, returning the first matched index of the array, otherwise return -1
 * 
 * @param {Array} arr The array to iterate 
 * @param {Function} callback The expression to evaluate
 * 
 * @returns {any} The matched index, otherwise -1
 */

function findIndex(arr, callback) {
    if(!(arr instanceof Array)) throw TypeError(arr + ' is not an array');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for(var i = 0; i < arr.length; i++) {
        if(callback(arr[i])) return i;
    }
    return -1;
}
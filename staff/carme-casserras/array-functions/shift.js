'use strict';

/**
 * removes the first element from an array.
 * 
 * @param {Array} array The array to pop the value from.
 * 
 * @returns {*} The value retrievied from the array.
 */
function shift(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    for (var i = 2; i < array.length; i++) {
        console.log(array.length)
        array[i]= callback(array[i]);
        

        console.log(array)
    }
    return array;
    
};
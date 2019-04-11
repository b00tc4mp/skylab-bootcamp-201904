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

    var array1 = [(array.length-1)];

    for (var i = 1; i < array.length; i++) {
        
        array1[i-1] = array[i];
    
    }
    return array1;
    
};
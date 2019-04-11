'user strict'

/**
 * Returns the last index at which a given element can be found in the array, or -1 
 * 
 * @param {Array} array The array to evaluate.
 * 
 * 
 */

function lastIndexOf(array, elem) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array')
    
    var acum = 0;
    for (var i = 0; i < array.length; i++) {
        if ( array[i] === elem) {   
            
            acum = i;
        } else acum = -1;
    
    }   
     return acum;
}
'user strict'


/**
 *The first array element becomes the last, and the last array element becomes the first.
 * 
 * 
 * @param {Array} array The array to evaluate.
 *
 * 
 */

 function reverse(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array')

    
    for (var i = (array.length); i > 0; i--) {
        array1[i] = array[i];
        
    }
    console.log(array)
    return array1

    
 }
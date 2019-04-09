/**
 *The first array element becomes the last, and the last array element becomes the first.
 * 
 * 
 * @param {Array} array The array to evaluate.
 *
 * 
 */

 function reverse(array) {
    
    for (var i = (array.length-1); i >= 0; i--) {
        array[i] = array[i];
        console.log(array[i])
    }

    return array
    
 }
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

    var array1 = [array.length];
    var primer = array[0];
    var ultim = array[array.length-1];

    for (i=0; i <array.length; i++){

        array1[i] = array[i];
    }
    array1[array1.length-1] = primer;
    array1[0] = ultim;
    
    return array1;    
 }
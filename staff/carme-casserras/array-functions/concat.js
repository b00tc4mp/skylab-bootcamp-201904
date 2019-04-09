/**
 * Concat 2 arrays in a new array
 * 
 * @param {Array} array The array to evaluate.
 * 
 * 
 */

function concat(array1, array2) {
    var acum = [];
    acum = array1;
     if (!(array1 instanceof Array)) throw TypeError(array + 'is not an array')
     if (!(array2 instanceof Array)) throw TypeError(array + 'is not an array')

    for (var i = 0; i < array2.length; i++) {       
        acum += ',' + array2[i];
    }
    return acum;
}
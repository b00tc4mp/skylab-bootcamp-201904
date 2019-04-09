/**
 * Concat 2 arrays in a new array
 * 
 * @param {Array} array The array to evaluate.
 * 
 * 
 */
var a = ['c','a','r'];
var b = ['d', 'a', 'n', 'i'];
var acum = [];
function concat(array1, array2) {
    acum = array1;
    
    for (var i = 0; i < array2.length; i++) {       
        acum += ',' + array2[i];
    }
    console.log(acum);
}

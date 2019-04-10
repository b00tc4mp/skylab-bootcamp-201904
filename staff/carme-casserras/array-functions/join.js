'user strict'


/**
 * Creates and returns a new string by concatenating all of the elements in an array
 * 
 * @param {Array} array The array to evaluate.
 * 
 * 
 */

function join(array) {
    var acum = [];
    for (var i = 0; i < array.length; i++) {
        acum += array[i]+ ' ';      
    }    
    
    return acum;
}
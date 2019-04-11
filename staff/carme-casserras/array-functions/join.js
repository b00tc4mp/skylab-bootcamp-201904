'user strict'


/**
 * Creates and returns a new string by concatenating all of the elements from an array
 * 
 * @param {Array} array The array to evaluate.
 * 
 * 
 */

function join(array) {
    var acum = '';
    for (var i = 0; i < array.length; i++) {
        if (i == array.length-1){
            acum += array[i];    
        } else {
            acum += array[i]+ ', ';
        }      
    }    
    
    return acum;
}
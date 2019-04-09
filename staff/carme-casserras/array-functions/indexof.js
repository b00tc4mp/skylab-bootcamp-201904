/**
 * Returns the first index at which a given element can be found in the array.
 * 
 * @param {Array} array The array to evaluate.
 * 
 * 
 */

function indexof(array, ele) {
    
    for (var i = 0; i < array.length; i++) {
        if (array[i] === ele)  {
            return i;       
        }        
    }    
    return -1;  
}

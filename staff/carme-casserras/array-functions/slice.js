'user strict' 

/**
 * returns a portion of an array into a new array object selected from begin to end
 * 
 * @param {Array} array The array to pop the value from.
 * 
 * @returns {*} The value retrievied from the array.
 */

 function slice(array, a, b) {
   
    var newArray = [];
    var pos = 0;
       
    for (var i = 0; i < array.length; i ++) {
        if (a > array.length-1) {
            return newArray;
        }
               
        if ((i >= a) && (i <= b-1)) {
            
            newArray[pos] = array[i];
            pos++;             
        } 
    }
       
        return newArray;
}
 
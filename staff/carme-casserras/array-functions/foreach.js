'use strict';

/**
 * Iterates an array and evaluates an expression on each of its values.
 * 
 * @param {Array} array The array to iterate.
 * @param {Function} callback The expression to evaluate.
 */
function forEach(array, callback) {
	if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
        
        function fore(ind) {
            callback(array[ind], ind);

            if (++ind < array.length) {
            fore(ind)
            }
        } 
        fore(0)
        
    
       /* function fore(ind) {
                if (ind < array.length) {
                callback(array[ind], ind)
                fore(ind+1)
                }
            } 
            fore( 0)*/
        
        
        /*function fore(array, callback, ind) {
            if (ind < array.length) {
            callback(array[ind], ind)
            fore(array, callback, ind+1)
            }
        } 
        fore(array, callback, 0)*/
        
       

   // }        

	/* for (var i = 0; i < array.length; i++) {
        callback(array[i], i);
     }*/
}
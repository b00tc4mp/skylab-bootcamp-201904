'user strict'


/**
 * Reduce a single value from an array (from right-to-left)
 * 
 * 
 * @param {Array} array The array to evaluate.
 * @param {Function} callback The expression to evalute.
 * 
 */

 function reduceRight(array, callback) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array')
    if (typeof callback !== 'function') throw TypeError(callback + ' is not a function')

    var acum = array[array.length-1];
    var nextAcum = 0;
        for (var i = (array.length-2); i >= 0; i--) {
                       
            nextAcum = callback(acum, array[i]);
            acum = nextAcum;
        }
        return acum;
 }
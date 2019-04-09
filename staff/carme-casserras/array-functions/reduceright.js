/**
 * Reduce a single value from an array (from right-to-left)
 * 
 * 
 * @param {Array} array The array to evaluate.
 * @param {Function} callback The expression to evalute.
 * 
 */

 function reduceRight(array, callback) {
    var acum = array[array.length-1];
    var nextAcum = 0;
        for (var i = (array.length-2); i >= 0; i--) {
                       
            nextAcum = callback(acum, array[i]);
            acum = nextAcum;
        }
        return acum;
 }
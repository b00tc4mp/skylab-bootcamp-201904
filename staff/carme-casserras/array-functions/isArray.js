'user strict'

/**
 * Determines whether the passed value is an array.
 * 
 * @param {Array} array The array to evaluate.
 *
 */
function isArray(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array')
    return array instanceof Array;
    }

/**
 * The reduce method applies a function to accumulate every value of the array, going through the array from the end 
 * @param {Array} array The array with values to accumulate
 * @param {Function} callback The function which makes the accumulation 
 * @returns {Element} Retunrs the accumulated value
 */

function reduceRight(array, callback){
    if(!(array instanceof Array)) throw TypeError(array + ' is not an array')
    if(typeof callback !== 'function') throw TypeError (callback+' is not a function')
    var accumulated=array[array.length-1] 
    for (var i = array.length-2; i >-1; i--){
      accumulated=(callback(accumulated, array[i]))
    }
  return accumulated;
  }

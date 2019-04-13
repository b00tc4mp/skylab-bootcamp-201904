'use strict';

/**
 * Hooray object is a global object used to the construction of hoorays, wich are list-like objects.
 */
function Hooray() {
    var first = arguments[0];

    if (arguments.length === 1 && typeof first === 'number')
        if (parseInt(first) !== first) throw RangeError('Invalid hooray');
        else return this.length = first;

    for (var i = 0; i < arguments.length; i++) this[i] = arguments[i];
    this.length = arguments.length;
}

/**
* Adds a value at the end of an hooray, incrementing its length by 1.
*
* @param {*} value The value to push in the hooray.
*
* @returns {number} The length of the hooray after adding the new value.
*/
Hooray.prototype.push = function (value) {
    if (arguments.length > 0)
        for (var i = 0; i < arguments.length; i++)
            this[this.length++] = arguments[i];

    return this.length;
}

/**
* Iterates the current hooray and evaluates an expression on each of its values.
*
* @param {Function} callback The expression to evaluate.
*/
Hooray.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;

    this.length && (function forEach(index) {
        callback(self[index], index);

        if (++index < self.length)
            forEach(index);
    })(0);
}

/**
* returns a hooray composed by the value of the arguments you passed in the function
*
* @param  {...any} manyArgs the elements to introduce in the new hooray
*/

Hooray.prototype.of = function(){
    var hooray = new Hooray();

    if(arguments.length > 0){
        for(var i = 0; i < arguments.length; i++) hooray[i] = arguments[i];

        hooray.length = arguments.length;
    }

    return hooray;
}

/**
* merge any number of arguments passed into a new hooray
*
* @param  {any} args the elements to concatenate with the hooray
*
* @return {Hooray} the new Hooray
*/

Hooray.prototype.concat = function (...args){

    var newHooray = new Hooray;

    for(var i = 0; i < this.length; i++){
        newHooray[newHooray.length] = this[i];
        newHooray.length++
    }

    for(var i = 0; i < arguments.length; i++){
        if(args[i] instanceof Hooray){
            for(var j = 0; j < args[i].length; j++) {
                newHooray[newHooray.length] = arguments[i][j];
                newHooray.length++
            }
        } else{
            newHooray[newHooray.length] = arguments[i];
            newHooray.length++
        }
    }
    return newHooray;
}

/**
* Iterates an Hooray and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false.
*
* @param {Function} callback The expression to evalute.
* @returns {boolean} True if all values match the expression, otherwise false.
*/

Hooray.prototype.every = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for (var i =    0; i < this.length; i++)
        if (!callback(this[i])) return false;

    return true;
}

/**
* modifies all the elements in the hooray object from a start index
*
* @param {Any} value the element you want to insert in the given hooray
* @param {Number} from the first index which you want to fill the value
* @param {Number} to the number of element do you want to fill with the given value
*/

Hooray.prototype.fill = function(value, from, to){
    if ((typeof from !== 'number') && (from !== undefined)) throw TypeError(from + ' is not a number');
    if ((typeof to !== 'number') && (to !== undefined)) throw TypeError(to + ' is not a number');

    var end = (to === undefined)||(to > this.length) ? this.length : to;
    var start = from === undefined ? 0 : from;

    for (var i = start; i < end; i++){
        this[i]= value;
    }

    return this;
}

/**
* Returns a new hooray containing the elements from the original hooray that matches the callback function condition
*
* @param {Function} callback the expresion to evaluate
*/

Hooray.prototype.filter = function(callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var newHooray = new Hooray();
    var j = 0;
    for(var i = 0; i < this.length; i++){
        if (callback(this[i]) == true){
            newHooray[newHooray.length]=this[i];
            newHooray.length++;
        }
    }
    return newHooray;
}

/**
* returns the first index of the passed array that satisfies the condition provided in the callback function
*
* @param {Array} array
* @param {Function} callback
*/

Hooray.prototype.findIndex = function(callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for(var i = 0; i < this.length; i++){
        if (callback(this[i])) return i;
    }
    return undefined;
}

/**
 * determines if and array contains the value determined. Return true if the value is contained or false if not
 *
 * @param {any} value the value to be searched
 * @param {number} index the index which it should start the search
 */

Hooray.prototype.includes = function(value, index){
    if((typeof index !== 'number')&&(index !== undefined)) throw TypeError(index + ' is not a number');

    var i = (index === undefined) ? 0 : index;
    for( i; i < this.length; i++)  if(this[i] === value) return true;
    return false;
}

/**
* returns the first index in wich you can find the given element or -1 if it's not present
*
* @param {any} element
* @param {Number} fromIndex
*/

Hooray.prototype.indexOf = function(element, fromIndex){
    if((typeof fromIndex !== 'number')&&(fromIndex !== undefined)) throw TypeError(fromIndex + ' is not a number');

    var i = fromIndex === undefined ? 0 : fromIndex;
    for(var j = i; j < this.length; j++)
        if (element === this[j]) return j;
    return -1;
}

/**
 * Returns true if the variable passed is a hooray. if not, returns false.
 *
 * @param {Variable} variable the variable to check if it's a hooray
 */

Hooray.prototype.isHooray = function(variable){
    return variable.constructor === Hooray ? true : false ;
}

/**
* Joins all the elements in the hooray using the element given as a separator. If no element is given, uses ','
*
* @param {any} element
*/

Hooray.prototype.join = function(element){
    var separator = element === undefined ? ',' : element;
    var string = '';

    for(var i = 0; i< this.length-1; i++) string += this[i]+separator;

    string += this[this.length - 1];

    return string;
}

/**
* returns the last index in wich you can find the given element or -1 if it's not present
*
* @param {any} element the element to search
*/

Hooray.prototype.lastIndexOf = function(element){

    for(var i = 0; i < this.length; i++)
        if (element === this[i]) var x = i;
    if(x !== undefined){
        return x;
    }else return -1;
}

/**
* creates a new hooray with the results of callback function aplied in each element of the given hooray
*
* @param {Function} callback the function to implement the changes wanted
*/

Hooray.prototype.map = function(callback){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var newHooray = new Hooray();
    for(var i = 0; i < this.length; i++) {
        newHooray[i] = callback(this[i]);
        newHooray.length++;
    }

    return newHooray;
}

/**
* reduces the given hooray to a value aplying the operation in the callback function form right to left
*
* @param {function} callback
* @param {number} start
*/

Hooray.prototype.reduceRight = function(callback, start){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    if ((start !== undefined) && (typeof start !=='number')) throw new TypeError(start + ' is not a number');

    var x = this.length-1;
    if (start === undefined){
        var result = this[x];
        x -= 1;
    }else {
        var result = start;
    }
    for(var i = x; i >= 0; i--){
        result = callback(result, this[i], i, this);
    }
    return result;
}

/**
* reduces the given hooray to a value aplying the operation in the callback function
*
* @param {function} callback
* @param {number} start
*/

Hooray.prototype.reduce = function(callback, start){
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
    if ((start !== undefined) && (typeof start !=='number')) throw new TypeError(start + ' is not a number');

    var x = 0;
    if (start === undefined){
        var result = this[0];
        x=1;
    }else {
        var result = start;
    }
    for(var i= x; i < this.length; i++){
        result = callback(result, this[i], i, this);
    }
    return result;
}
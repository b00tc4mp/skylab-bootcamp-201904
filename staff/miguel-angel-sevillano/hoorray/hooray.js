'use strict';

/**
 * 
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
 * Iterates the current hooray and evaluates an expression on each of its values.--------------------------------FOR-EACH---------------------------------------------
 * 
 * @param {Function} callback The expression to evaluate.
 */
Hooray.prototype.forEach = function (callback) {
    if (typeof callback !== 'function') throw new TypeError(' is not a function');

    var self = this;

    this.length && (function forEach(index) {
        callback(self[index], index);

        if (++index < self.length)
            forEach(index);
    })(0);
}



/**
 *This function merge two or more arrays and returns a new aarray ----------------------------------------------CONCAT------------------------------------------------
 *@returns {hooray} hooray with values of merged arrays
 *
 */


Hooray.prototype.concat = function () {
    if (arguments.length == 0) throw TypeError('argument is empty');

    var k = 0;
    var self = this;
    var k = this.length;


    for (var i = 0; i < arguments.length; i++) {

        var arg = arguments[i];

        for (var j = 0; j < arguments[i].length; j++) {
            self[k] = arg[j];

            k++;
        }
    }
    self.length = self.length + arg.length;
    return self;
}


/**
 * Iterates an array and evaluates an expression on each of its values, returning true if all of them match it. Otherwise returns false. --------------EVERY-------------
 * @param {Function} callback The expression to evalute.
 * @returns {boolean} True if all values match the expression, otherwise false.
 */


Hooray.prototype.every = function (callback) {

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    var self = this;
    for (var i = 0; i < this.length; i++)
        if (!callback(self[i])) return false; //si el reusltado del a funcion callback no es true , es false
        else {
            return true;
        }
}



/**This function returns a new array filtering the parametres providen by callback --------------------------------------FILTER--------------------------------
 * @param {Function} callback The callback function 
 */


Hooray.prototype.filter = function (callback) {

    if (typeof callback !== 'function') throw new TypeError('is not a function');

    var newarr = new Hooray;
    var self = this;
    var result = Boolean;
    var n = 0;

    for (var i = 0; i < this.length; i++) {

        result = callback(self[i])
        if (result == true) {
            newarr[n] = self[i];
            newarr.length++;
            n++;
        }
    }

    return newarr;
}

/**This function returns the index position in the hoorayof value passed by -----------------------------------------INDEX OF--------------------------------------
 * @param {value} item the item you want to know their index position
 */


Hooray.prototype.index_Of = function (item) {

    if (typeof item === "undefined") throw new TypeError('its undefined');


    var self = this;

    for (let i = 0; i < this.length; i++) {

        if (self[i] == item) {
            return i;
        }
    }
    return -1;
}


/**
 * This function checks if the argument passed is an hooray or not --------------------------------------------ISHOORAY--------------------------------------------
 * @param {argument} item to check if its in the hooray or not
 */

Hooray.prototype.isHooray = function (item) {

    if (typeof item === "object") {
        return true;
    }
    else { return false };
}



/**This function join each element of an hooray passed by applaying arguments ------------------------------------------JOIN---------------------------------------
 * @param {argument} item  without item it returns all the hooray with items separated by "," , with item it add the item between
 */

Hooray.prototype.join = function (item) {

    if (typeof item != 'string' || typeof item != 'number') new TypeError('only strings or numbers please')

    var temp = "";
    var self = this;


    if (item === undefined) {
        for (let i = 0; i < this.length; i++) {

            temp += self[i];
            if (i < this.length - 1) {
                temp += ",";
            }
        }
    }
    else if (item === ' ') {
        for (let i = 0; i < this.length; i++) {
            temp += self[i]

        }
    }

    else {
        for (let i = 0; i < this.length; i++) {

            temp += self[i];
            if (i < this.length - 1) {
                temp += item;

            }
        }
        return temp;
    }

}

/**this function returns the last index where the item passed by is ---------------------------------LAST INDEXOF-----------------------------
 * @param {agmuent} item The item you want to know the idex
 * @param {argument} index The index you wabt 
 * 
 */

Hooray.prototype.lastindexof = function (item, index) {


    if (typeof index !== "undefined" && typeof index !== 'number') throw new TypeError(' index its not a number');

    var temp = undefined
    var self = this

    if (index === undefined) {
        for (var i = 0; i < this.length - 1; i++) {
            if (self[i] == item) {
                temp = i;
            }
        }
        if (temp !== undefined) {
            return temp;
        }
        else {
            return false;
        }
    }
    else {

        for (var j = index; j >= 0; j--) {
            if (this[j] == item) {
                temp = j;
            }

        }
        if (temp !== undefined) {
            return temp;
        }
        else {
            return false;
        }
    }



}



/**This function returns a new arrar whoth the results passed by the callback -------------------------------------------------------MAP-------------------------
 * @param {function} callback the function that defines what you want to do with each element of the array
 * @param {argument} value the vaue you want to pass by
 */




Hooray.prototype.map = function (callback, value) {

    if (typeof this !== "object") throw TypeError('its not an hooray')
    if (typeof callback !== 'function') throw new TypeError('is not a function');


    var newarr = new Hooray;
    var acc = value;
    var self = this;

    for (var i = 0; i < this.length; i++) {

        if (value === undefined) {
            acc = self[i];
            newarr[i] = callback(self[i], acc);
            newarr.length++;
        }
        else {
            newarr[i] = callback(self[i], acc);
            newarr.length++;
        }

    }
    return newarr;
}


/**This function executes a reducer function (that you provide) on each member of the array resulting in a single output value.--------------------REDUCE
* 
* @param {function} callback the function that defines what you want to do with each element of the array
* @param {argument} item Optional , the argument you want to pass for  every item of the array
*/


Hooray.prototype.reduce = function (callback, item) {

    if (typeof callback !== 'function') throw new TypeError(callback + ' its not a function');

    var i = 0;
    var acc = 0;
    var final;
    var self = this;


    if (item == undefined) {

        acc = self[0]

        for (i = 0; i < this.length; i++) {
            acc = callback(acc, self[i]);
        }
        final = acc;
        return final;
    }
    else {

        acc = item
        for (i = 0; i < this.length; i++) {
            acc = callback(acc, self[i]);

        }
        final = acc;
        return final;
    }
}



/**This function do the same as reduce but it starts from the end of the array -----------------------------------REDUCE-RIGHT----------
 * 
 * @param {function} callback the function that defines what you want to do with each element of the array
 * @param {argument} item Optional , the argument you want to pass for  every item of the array
 */


Hooray.prototype.reduceRight = function (callback, item) {

    if (typeof callback !== 'function') throw new TypeError(callback + ' its not a function');
    var i = 0;
    var acc = 0;
    var final = 0;
    var self = this;


    if (item === undefined) {
        acc = self[0];

        for (i = this.length - 1; i > 0; i--) {
            acc = callback(acc, self[i]);
        }

        final = acc;
        return final;
    }
    else {

        acc = item
        for (i = this.length - 1; i > 0; i--) {
            acc = callback(acc, self[i]);
        }

        final = acc;
        return final;
    }
}


/**This function changes the first and last postion of an array .----------------------------------------REVERSE--------------------------------
 * 
 * @param {hooray} hooray the array you want to apply the reverse
 */



Hooray.prototype.reverse = function () {

    var self = this;
    var temp = self;
    var last = self[self.length - 1];
    var first = self[0];


    temp[self.length - 1] = first;
    temp[0] = last;

    self = temp;
    self.length = temp.length;

    return self;


}



/**This function removes the first element of an array passed by or retuns undefined if length is 0 ---------------------------SHIFT-----------------------------
 * 
 * @param {hooray} hooray The array to do the shift
 */



Hooray.prototype.shift = function () {

    var temp = new Hooray();
    var n = 0;
    var self = this;
    var item = self[0];

    if (this.length != 0) {
        for (var i = 1; i < this.length; i++) {
            temp[n] = self[i];
            n++;
        }
        temp.length = self.length - 1;

        for (var b = 0; b < temp.length; b++) {
            self[b] = temp[b];
        }

        return item;
    }
    else {
        return undefined;
    }
}



/**
 * The slice() method extracts a section of a string and returns it as a new string, without modifying the original string.--------------------SLICE---------------
 * @param {Number}first the start point
 * @param {Number} last the end point
 */
Hooray.prototype.slice = function (first, last) {


    if (typeof first !== 'number') throw new TypeError('is not a number');
    if (typeof last !== 'number') throw new TypeError('is not a number');

    var newarr = new Hooray();
    var index = 0;
    var self = this;


    for (var i = first; i <= last - 1; i++) {
        newarr[index] = this[i];
        newarr.length++;
        index++;
    }
    return newarr;
}


/**This function iterates trough an Hooray and checks if there is any coincidence with the argument and condition passed by-------------------SOME--------------
 * 
 * @param {Function} callback The callback funtion to apply the statments
 * @param {argument} item The item you want to use to compare
 */



Hooray.prototype.some = function (callback, item) {

    if (typeof callback !== 'function') throw new TypeError('its not a function');

    var acc = item;
    var self = this;
    var value = Boolean;

    if (this.length == 0) {
        return false;
    }
    else {


        for (var i = 0; i < this.length; i++) {
            value = callback(acc, self[i]);

            if (value == true) return value;
        }
    }
}


/**
 * this function changes the contents of an array by removing or replacing existing elements and/or adding new elements ---------------------------SPLICE----------------
 
 * @param {number} index the index position where start
 * @param {number} remove the amount of item you want  to eliminate
 * @param {argument} add the item you want to add
 */




Hooray.prototype.splice = function (index, erase, add) {

    if (typeof index !== 'number') throw new TypeError('is not a number');

    var n = 0;
    var token = 0;
    var newarr = new Hooray();
    var self = this;


    for (let i = 0; i < this.length; i++) {

        if (i == index) {

            if (erase > 0) {
                erase--;
                token = 1;
            }
            if (add != undefined && token == 1) {

                newarr[n] = add;
                newarr.length++;
                n++;
                add = undefined;
                token = 0;
            }
            else if (add !== undefined) {
                newarr[n] = add;
                newarr.length++;
                n++;
                newarr[n] = self[i];
                newarr.length++;
                add = undefined;
                token = 1;
            }
            else {
                token = 0;
            }

        }
        else if (i > index && token == 1) {
            n++;
            newarr[n] = self[i];
            newarr.length++;

        }
        else if (token == 0) {
            newarr[n] = self[i];
            n++;
            newarr.length++;
            token = 0;
        }
        else {
            newarr[n] = self[i];
            newarr.length++;
            n++;
        }

    }
    self = newarr;
    return self;

}


/**this function sorts the elements of the hoorray comparing them -----------------------------------SORT------------------------------------------------
 * 
 * @param {} hooray the hooray to iterate to do the sort 
 */



Hooray.prototype.sort = function () {


    var newar = new Hooray;
    var n = 0;
    var acc = this.length;
    var e = this.length - 1;
    var token = 0;
    var self = this;
    var count=0;
   
    for (let a = 0; a < this.length; a++) {

        for (var i = 0; i < acc; i++) {
            token = 0;

            if (self[i] > self[i + 1] && i < e) {
                newar[n] = self[i + 1];
                n++;
                newar[n] = self[i];
                n++;
                token = 1;
                count++
            }

            if (count >0){
                i++;
                count = 0;
            }


            else if (token === 0 && n == i) {

                newar[n] = self[i];
                n++;
            }

        }
        
        n = 0;
        newar.length = self.length;
        for (var b = 0; b < newar.length; b++) {
            self[b] = newar[b];

        }

    }

    return newar;
}











"use strict";
function common_throwError_callback(functionToTest) {
  it("should break when you not pass a callback function", function() {
    expect(function() {
      return functionToTest.call(new Hooray());
    }).toThrowError(Error, "undefined is not a function");
  });

  it("should break when you pass a callback that is not function", function() {
    expect(function() {
      return functionToTest.call(new Hooray(), 1);
    }).toThrowError(Error, "undefined is not a function");
  });
}

function common_doNothingIfNoContent(functionToTest) {
  it("should do nothing if hooray has not content", function() {
    var hooray = new Hooray();

    var functionWrapper = { dummyFn () {} }
    var spyCallback = spyOn(functionWrapper, "dummyFn");
    functionToTest.call(hooray,functionWrapper.dummyFn);

    expect(spyCallback).not.toHaveBeenCalled();
  });
}

function newHorrayFromArray(array) {
  var hooray = new Hooray;
  Hooray.apply(hooray, array);
  return hooray;
}

function createRandomDefaultFn(maxType) {
    var type = (typeof maxType !== "undefined") ? maxType : Math.floor(Math.random() * 3) ;
    switch (type) {
      case 0:
        return Math.random() * 10000;
      case 1:
        return Math.floor(Math.random() * 10000);
      case 2:
        return String(Math.random() * 10000);
    }
}

function randomArray(length, createElementfn) {  
  if (!length) length = Math.floor(Math.random() * 100 + 2);
  createElementfn = createElementfn || createRandomDefaultFn;
  var result = [];
  for (var k = 0; k < length; k++) {
    result.push(createElementfn());
  }
  return result;
}

function resultObjectFromArray(array) {
  var result = {};
  for (var k = 0; k < array.length; k++) {
    result[k] = array[k];
  }
  result['length'] = array.length;
  return result;
}

describe("hooray", function() {
  describe("constructor", function() {
    it("should construct an empty hooray when no arguments", function() {
      var hooray = new Hooray();

      expect(hooray.length).toBe(0);
      expect(Object.keys(hooray).length).toBe(1);
    });

    it("should construct a non-empty hooray when existing arguments", function() {
      var hooray = new Hooray(1, 2, 3);

      expect(hooray.length).toBe(3);
      expect(hooray).toEqual(
        jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 })
      );
      expect(Object.keys(hooray).length).toBe(4);
    });

    it("should construct an empty hooray with length equal to when only one numeric argument", function() {
      var hooray = new Hooray(1);

      expect(hooray.length).toBe(1);
      expect(Object.keys(hooray).length).toBe(1);
    });

    it("should construct a non-empty hooray with only one non-numeric argument", function() {
      var hooray = new Hooray("1");

      expect(hooray.length).toBe(1);
      expect(hooray).toEqual(jasmine.objectContaining({ 0: "1", length: 1 }));
      expect(Object.keys(hooray).length).toBe(2);
    });
  });

  describe("push", function() {
    var array;
    var hooray;

    beforeEach(function() {
      array = randomArray();
      hooray = newHorrayFromArray(array);
    })

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    })
        
    it("should add a value at the end of an hooray", function() {
      var randomItem = createRandomDefaultFn(3);
      var returnArrayPush= array.push(randomItem);
      var returnArrayHooray = hooray.push(randomItem);
      var expected = resultObjectFromArray(array);

      expect(hooray.length).toBe(returnArrayHooray);
      expect(returnArrayPush).toBe(returnArrayHooray);
      expect(hooray.length).toBe(array.length);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should add multiple values at the end of an hooray in order", function() {
      var multipleItems = randomArray();
      var returnArrayPush = Array.prototype.push.call(array, multipleItems);
      var returnHoorayPush = Hooray.prototype.push.call(hooray, multipleItems);
      var expected = resultObjectFromArray(array);

      expect(hooray.length).toBe(array.length);
      expect(returnHoorayPush).toBe(hooray.length);
      expect(returnHoorayPush).toBe(returnArrayPush);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should not add a non-provided value at the end of an hooray", function() {
      var returnArrayPush= array.push();
      var returnArrayHooray = hooray.push();
      var expected = resultObjectFromArray(array);

      expect(hooray.length).toBe(returnArrayHooray);
      expect(returnArrayPush).toBe(returnArrayHooray);
      expect(hooray.length).toBe(array.length);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });
  });

  describe("slice", function() {
    var array;
    var hooray;

    beforeEach(function() {
      array = randomArray();
      hooray = newHorrayFromArray(array);
    })

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    })

    it("should return a copy of same hooray, not the original one ", function() {
      var result = hooray.slice();
      var expected = resultObjectFromArray(array);

      expect(result).toEqual(jasmine.objectContaining(expected));
      expect(hooray).toEqual(jasmine.objectContaining(expected));
      expect(hooray.length).toBe(array.length);
      expect(hooray).not.toBe(result);
    });

    it("should return all elements behind the position given", function() {
      var randomIndex = Math.floor(array.length * Math.random());
      var expectedArray = array.slice(randomIndex);
      var expected = resultObjectFromArray(expectedArray);

      expect(hooray.slice(randomIndex)).toEqual(jasmine.objectContaining(expected));
      expect(hooray).toEqual(jasmine.objectContaining(newHorrayFromArray(array)));
    });
  });

  describe("concat", function() {
    var newArray1;
    var newArray2;
    var hooray1;
    var hooray2;

    var expectedArray;
    var expectedLength;
    var expected;
    var result;

    function createHooraysAndResults() {
      hooray1 = newHorrayFromArray(newArray1);
      hooray2 = newHorrayFromArray(newArray2);

      expectedArray = newArray1.concat(newArray2);
      expectedLength = expectedArray.length;
      expected = resultObjectFromArray(newArray1.concat(newArray2));
      result = hooray1.concat(hooray2);
    }
  
    afterEach(function() {
      newArray1 = undefined;
      newArray2 = undefined;
      hooray1 = undefined;
      hooray2 = undefined;
  
      expectedArray = undefined;
      expectedLength = undefined;
      expected = undefined;
      result = undefined;
      })

    it("should return concatenated elements of two hoorays", function() {
      newArray1 = randomArray();
      newArray2 = randomArray();

      createHooraysAndResults();

      expect(result.length).toBe(expectedLength);
      expect(result).toEqual(jasmine.objectContaining(expected));
    });

    it("should return concatenated properly with empty target array ", function() {
      newArray1 = [];
      newArray2 = randomArray();

      createHooraysAndResults();

      expect(result.length).toBe(expectedLength);
      expect(result).toEqual(jasmine.objectContaining(expected));
    });    
    it("should return concatenated properly with empty array as parameter", function() {
      newArray1 = randomArray();
      newArray2 = [];

      createHooraysAndResults();

      expect(result.length).toBe(expectedLength);
      expect(result).toEqual(jasmine.objectContaining(expected));
    });
  });

  describe("every", function() {
    var array;
    var hooray;

    beforeEach(function() {
      array = randomArray(null, function () { return Math.ceil(Math.random() * 1000);});
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    })

    it("should return true when all fulfill the condition", function() {
      hooray = newHorrayFromArray(array);
      var result = hooray.every(function(v) {
        return v > 0;
      });
      expect(result).toBeTruthy();
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should return false when any element not fulfill the condition", function() {
      array.push(-1);
      hooray = newHorrayFromArray(array);
      var result = hooray.every(function(v) {
        return v > 1;
      });
      expect(result).toBeFalsy();
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.every);
    common_throwError_callback(Hooray.prototype.every);
  });

  describe("fill", function() {
    var array;
    var hooray;
    var randomStart;
    var randomEnd;

    beforeEach(function () {
      array = randomArray();
      hooray = newHorrayFromArray(array);
      randomStart = Math.floor(array.length * Math.random());
      randomEnd = randomStart + Math.floor((array.length - randomStart) * Math.random());
    })

    afterEach(function() {
      array = undefined;
      hooray = undefined;
      randomStart = undefined;
      randomEnd = undefined;
    })

    it("should modified hooray only affect in middle positions", function() {
      var randomItem = createRandomDefaultFn(3);
      var expectedArray = array.fill(randomItem,randomStart,randomEnd);
      var expected = resultObjectFromArray(expectedArray);

      var result = hooray.fill(randomItem, randomStart, randomEnd);
      expect(result).toEqual(jasmine.objectContaining(expected));
    });

    it("should modified hooray affect from selected position to end", function() {
      var randomItem = createRandomDefaultFn(3);
      var expectedArray = array.fill(randomItem,randomStart);
      var expected = resultObjectFromArray(expectedArray);

      var result = hooray.fill(randomItem, randomStart);
      expect(result).toEqual(jasmine.objectContaining(expected));
    });

    it("should fill all hooray with the value", function() {
      var randomItem = createRandomDefaultFn(3);
      var expectedArray = array.fill(randomItem);
      var expected = resultObjectFromArray(expectedArray);

      var result = hooray.fill(randomItem);
      expect(result).toEqual(jasmine.objectContaining(expected));

    });
  });

  describe("filter", function() {
    var array;
    var hooray;

    function filterFn(value) {
      return value > 500;
    }

    beforeEach(function() {
      array = randomArray(null, function () { return Math.ceil(Math.random() * 1000);});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    })

    it("should show only return elements that fulfill condition", function() {
      var expected = resultObjectFromArray(array.filter(filterFn));

      expect(hooray.filter(filterFn)).toEqual(jasmine.objectContaining(expected));
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.filter);
    common_throwError_callback(Hooray.prototype.filter);
  });

  describe("findIndex", function() {
    var array;
    var hooray;

    function findIndexFn(value) {
      return value > 500;
    }

    beforeEach(function() {
      array = randomArray(null, function () { return Math.ceil(Math.random() * 1000);});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    })

    it("should return first element that fulfill condition", function() {
      var expected = array.findIndex(findIndexFn);
      expect(hooray.findIndex(findIndexFn)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.findIndex);
    common_throwError_callback(Hooray.prototype.findIndex);
  });

  describe("find", function() {
    var array;
    var hooray;

    function findFn(value) {
      return value > 500;
    }

    beforeEach(function() {
      array = randomArray(null, function () { return Math.ceil(Math.random() * 1000);});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    })

    it("should return first element that fulfill condition", function() {
      var expected = array.find(findFn);
      expect(hooray.find(findFn)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.find);
    common_throwError_callback(Hooray.prototype.find);
  });

  describe("forEach", function() {
    it("should iterate an hooray without altering it", function() {
      var array = randomArray();
      var hooray = newHorrayFromArray(array);

      var resultHooray = new Hooray();
      function forEachHooray(value) {
        resultHooray.push(value);
      }      
      hooray.forEach(forEachHooray);

      var resultArray = [];
      function forEachArray(value) {
        resultArray.push(value);
      }      
      array.forEach(forEachArray);
      
      var expected = resultObjectFromArray(resultArray);

      expect(resultHooray).toEqual(jasmine.objectContaining(expected));
      expect(resultHooray.length).toBe(resultArray.length);
    });

    common_doNothingIfNoContent(Hooray.prototype.forEach);
    common_throwError_callback(Hooray.prototype.forEach);
  });

  describe("includes", function() {
    var array;
    var hooray;
    var randomElement;
    
    afterEach(function() {
      array = undefined;
      hooray = undefined;
      randomElement = undefined;
    });    
    
    function initialHoorayNumbers() {
      array = randomArray(null, function () { return Math.ceil(Math.random() * 1000 + 1);});
      hooray = newHorrayFromArray(array);
      randomElement = array[Math.floor(Math.random() * array.length)];
    }

    function initialHoorayStrings() {
      array = randomArray(null, function () { return String(Math.ceil(Math.random() * 1000) + 1);});
      hooray = newHorrayFromArray(array);
      randomElement = array[Math.floor(Math.random() * array.length)];
    }

    it("should return true if includes a present element (numbers)", function() {
      initialHoorayNumbers();
      expect(hooray.includes(randomElement)).toBeTruthy();
    });

    it("should return true if includes a present element (string)", function() {
      initialHoorayStrings();
      expect(hooray.includes(randomElement)).toBeTruthy();
    });

    it("should return false if not includes a exact coincidence", function() {
      initialHoorayStrings();
      expect(hooray.includes("0")).toBeFalsy();
    });

  });

  describe("indexOf", function() {
    var array;
    var hooray;
    var itemToSearch;
    var positionOfItem;
    
    beforeEach(function () {
      array = randomArray(null, function () { return Math.ceil(Math.random() * 1000 + 1);});
      hooray = newHorrayFromArray(array);
      positionOfItem = Math.floor(2 + (Math.random() * array.length - 2));
      itemToSearch = array[positionOfItem];
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
      positionOfItem = undefined;
      itemToSearch = undefined;      
    });        

    it("should return the index of first ocurrence", function() {
      var expected = array.indexOf(itemToSearch);

      expect(hooray.indexOf(itemToSearch)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should return the index of ocurrence behind fromIndex", function() {
      var fromIndex = Math.floor(Math.random() * positionOfItem);
      array[fromIndex - Math.floor(Math.random() * fromIndex)] = itemToSearch;
      hooray = newHorrayFromArray(array);
      var expected = array.indexOf(itemToSearch, fromIndex + 1);

      expect(hooray.indexOf(itemToSearch, fromIndex + 1)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should return -1 if no coincidence", function() {
      expect(hooray.indexOf(-100)).toBe(-1);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });
  });

  describe("join", function() {
    var array;
    var hooray;
    
    beforeEach(function () {
      array = randomArray();
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    });

    it("should return a string with elements merged with a comma", function() {
      expect(hooray.join()).toBe(array.join());
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should return a string with elements merged without space", function() {
      expect(hooray.join("")).toBe(array.join(""));
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should return a string with elements merged with a separator", function() {
      expect(hooray.join("-")).toBe(array.join("-"));
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });
  });

  describe("lastIndexOf", function() {
    var array;
    var hooray;
    var itemToSearch;
    var positionOfItem;
    
    beforeEach(function () {
      array = randomArray(100, function () { return Math.ceil(Math.random() * 1000 + 1);});
      hooray = newHorrayFromArray(array);
      positionOfItem = Math.floor(10 + (Math.random() * array.length - 10));
      itemToSearch = array[positionOfItem];
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
      positionOfItem = undefined;
      itemToSearch = undefined;      
    });        

    it("should return last element equal", function() {
      var expected = array.lastIndexOf(itemToSearch);

      expect(hooray.lastIndexOf(itemToSearch)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should return last element equal behind position given", function() {
      var fromIndex = Math.floor(Math.random() * positionOfItem);
      array[fromIndex - Math.floor(Math.random() * fromIndex)] = itemToSearch;
      hooray = newHorrayFromArray(array);
      var expected = array.lastIndexOf(itemToSearch, positionOfItem - 1);

      expect(hooray.lastIndexOf(itemToSearch, positionOfItem - 1)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });
  });

  describe("map", function() {
    var array;
    var hooray;
    
    beforeEach(function () {
      array = randomArray(undefined, function () { return Math.ceil(Math.random() * 1000 + 1);});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    });        

    it("should return elements value doubled", function() {
      var doubleFn = function (v) { return v * 2; };
      var expected = resultObjectFromArray(array.map(doubleFn));

      expect(hooray.map(doubleFn)).toEqual(jasmine.objectContaining(expected));
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.map);
    common_throwError_callback(Hooray.prototype.map);
  });

  describe("pop", function() {
    var array;
    var hooray;
    
    beforeEach(function () {
      array = randomArray(undefined, function () { return Math.ceil(Math.random() * 1000 + 1);});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    });   

    it("pop a single element", function() {
      var expectedReturn = array.pop();
      var expected = resultObjectFromArray(array);

      expect(hooray.pop()).toBe(expectedReturn);      
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });
  });

  describe("reduceRight", function() {
    var array;
    var hooray;
    
    beforeEach(function () {
      array = randomArray(undefined, function () { return String(Math.ceil(Math.random() * 1000 + 1));});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    });

    function joinReducer(acc, value) {
      acc = acc + value;
    }

    it("should reduce a hooray in reverse order", function() {
      var expected = array.reduceRight(joinReducer);

      expect(hooray.reduceRight(joinReducer)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.map);
    common_throwError_callback(Hooray.prototype.reduceRight);
  });

  describe("reduce", function() {
    var array;
    var hooray;
    
    beforeEach(function () {
      array = randomArray(undefined, function () { return String(Math.ceil(Math.random() * 1000 + 1));});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    });

    function joinReducer(acc, value) {
      acc = acc + value;
    }

    it("should reduce all items in the hooray", function() {
      var expected = array.reduce(joinReducer);
      expect(hooray.reduce(joinReducer)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should reduce all items in the hooray with initial value", function() {
      var inititalValue = String(createRandomDefaultFn(3));
      var expected = array.reduce(joinReducer, inititalValue);

      expect(hooray.reduce(joinReducer, inititalValue)).toBe(expected);
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.map);
    common_throwError_callback(Hooray.prototype.reduce);
  });

  describe("shift", function() {
    var array;
    var hooray;
    
    beforeEach(function () {
      array = randomArray(undefined, function () { return String(Math.ceil(Math.random() * 1000 + 1));});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    });

    it("should return the element deleted and change original hooray", function() {
      var expectedReturn = array.shift();
      var expected = resultObjectFromArray(array);

      expect(hooray.shift()).toBe(expectedReturn);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });
  });

  describe("some", function() {
    var array;
    var hooray;

    beforeEach(function() {
      array = randomArray(null, function () { return Math.ceil(Math.random() * 1000);});
      hooray = newHorrayFromArray(array);
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
    })

    it("should return true when all fulfill the condition", function() {
      var oneRandomItemPresent = array[Math.floor(Math.random() * array.length)];
      var someFn = function (v) { return v === oneRandomItemPresent; };
      expect(hooray.some(someFn)).toBeTruthy();
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    it("should return false when all elements not fulfills the condition", function() {
      var someFn = function (v) { return v > 1000; };
      expect(hooray.some(someFn)).toBeFalsy();
      expect(hooray).toEqual(jasmine.objectContaining(resultObjectFromArray(array)));
    });

    common_doNothingIfNoContent(Hooray.prototype.map);
    common_throwError_callback(Hooray.prototype.some);
  });

  describe("sort", function() {
    it("should sort original hooray of strings", function() {
      var array = randomArray(undefined, function () { return String(Math.ceil(Math.random() * 1000 + 1));});
      var hooray = newHorrayFromArray(array);
      array.sort();
      var expected = resultObjectFromArray(array);

      hooray.sort();
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should sort original hooray of strings", function() {
      var array = randomArray(undefined, function () { return Math.ceil(Math.random() * 1000 + 1);});
      var hooray = newHorrayFromArray(array);
      array.sort();
      var expected = resultObjectFromArray(array);

      hooray.sort();
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should sort numbers in right why with proper compare function", function() {
      var array = randomArray(undefined, function () { return Math.ceil(Math.random() * 1000 + 1);});
      var hooray = newHorrayFromArray(array);
      var sortFn = function(a, b) { return a - b; }; 

      array.sort(sortFn);
      var expected = resultObjectFromArray(array);

      hooray.sort(sortFn);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });
  });

  describe("splice", function() {
    var array;
    var hooray;
    var someStart;
    var actualStart;
    var someDeleteCount;
    var someItemsToAdd;
    var singleItem;
    
    beforeEach(function () {
      array = randomArray(undefined, function () { return String(Math.ceil(Math.random() * 1000 + 1));});
      hooray = newHorrayFromArray(array);
      var len = array.length;
      var start = Math.floor(len * Math.random()) * (Math.random() < 0.5 ? 1 : -1);
      someStart = start < 0 ? Math.max(len + start,0) : Math.min(start, len);
      someDeleteCount = Math.floor(Math.random() * (len - someStart));
      someItemsToAdd = randomArray(undefined, function () { return String(Math.ceil(Math.random() * 1000 + 1));});
      singleItem = String(createRandomDefaultFn(3));
    });

    afterEach(function() {
      array = undefined;
      hooray = undefined;
      someStart = undefined;
      actualStart = undefined;
      someDeleteCount = undefined;
      someItemsToAdd = undefined;
      singleItem = undefined;
    });

    it("should inserts 1 item at 1st index position", function() {      
      var arrayReturnedValue = array.splice(1, 0, singleItem);
      var expectedReturn = resultObjectFromArray(arrayReturnedValue)
      var expected = resultObjectFromArray(array);

      var hoorayReturnedValue = hooray.splice(1, 0, singleItem);
      expect(hoorayReturnedValue).toEqual(jasmine.objectContaining(expectedReturn));
      expect(arrayReturnedValue.length).toBe(arrayReturnedValue.length);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should replaces 1 element at some index(positive or negative)", function() {
      var arrayReturnedValue = array.splice(someStart, 0, singleItem);
      var expectedReturn = resultObjectFromArray(arrayReturnedValue)
      var expected = resultObjectFromArray(array);

      var hoorayReturnedValue = hooray.splice(someStart, 0, singleItem);
      expect(hoorayReturnedValue).toEqual(jasmine.objectContaining(expectedReturn));
      expect(arrayReturnedValue.length).toBe(arrayReturnedValue.length);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should replaces several elements at some index(positive or negative) no deleting items", function() {
      var args = [someStart, 0].concat(someItemsToAdd);
      var arrayReturnedValue = Array.prototype.splice.apply(array, args);
      var expectedReturn = resultObjectFromArray(arrayReturnedValue)
      var expected = resultObjectFromArray(array);

      var hoorayReturnedValue = Hooray.prototype.splice.apply(hooray, args);
      expect(hoorayReturnedValue).toEqual(jasmine.objectContaining(expectedReturn));
      expect(arrayReturnedValue.length).toBe(arrayReturnedValue.length);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });

    it("should replaces several elements at some index(positive or negative) deleting items", function() {
      var args = [someStart, someDeleteCount].concat(someItemsToAdd);

      var arrayReturnedValue = Array.prototype.splice.apply(array, args);
      var expectedReturn = resultObjectFromArray(arrayReturnedValue)
      var expected = resultObjectFromArray(array);

      var hoorayReturnedValue = Hooray.prototype.splice.apply(hooray, args);
      expect(hoorayReturnedValue).toEqual(jasmine.objectContaining(expectedReturn));
      expect(arrayReturnedValue.length).toBe(arrayReturnedValue.length);
      expect(hooray).toEqual(jasmine.objectContaining(expected));
    });    
  });
});

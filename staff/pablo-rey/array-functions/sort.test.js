'use strict';

describe("sort", function () {
  function initialArrayString() {
    return ['March', 'Jan', 'Feb', 'Dec'];
  };
  function initialArrayNumbers() {
    return [1, 30, 4, 21, 100000];
  }

  it("should sort original array of strings", function() {
    var array = initialArrayString();
    var expected = ["Dec", "Feb", "Jan", "March"]

    sort(array);
    expect(array, expected, true);
  });

  it("should sort original array of strings", function() {
    var array = initialArrayNumbers();
    var expected = [1, 100000, 21, 30, 4];

    sort(array);
    expect(array, expected, true);
  });

  common_throwError_array(sort);

})


// var months = ['March', 'Jan', 'Feb', 'Dec'];
// months.sort();
// console.log(months);
// // expected output: Array 

// var array1 = [1, 30, 4, 21, 100000];
// sort(array1);
// console.log(array1);
// // expected output: Array [1, 100000, 21, 30, 4]
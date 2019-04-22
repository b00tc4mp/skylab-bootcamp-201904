"use strict";

describe('forEach', function () {
  function initialArray() {
    return [1,2,3];
  }

  it('should iterate an array without altering it', function () {
    var array = initialArray();
    var result = [];
    forEach(array, function (v, i) { result[i] = v; })

    expect(initialArray(), result, true);
    expect(array, initialArray(), true);
  });

  common_throwError_array(forEach);
  common_throwError_callback(forEach, initialArray());

});
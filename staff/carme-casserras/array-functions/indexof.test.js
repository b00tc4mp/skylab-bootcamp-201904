'use strict'

suite('indexOf', function() {
    test('Returns the first index at which a given element can be found in the array', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'bison'];

        var answer = 2;
        var result = indexOf(array, 'camel');
        
        expect(result, answer);             
         
             
    });

    test('should break on undefined array', function () {
        
        try {
            indexOf();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });


});
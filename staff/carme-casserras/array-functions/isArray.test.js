'use strict'

suite('isArray', function() {
    test('Determines whether the passed value is an array', function() {
        var a = ['c','a','r'];
        var answer = true;
        var result = isArray(a);           
        expect(result, answer);           
      
    });

    test('should break on undefined array', function () {
        
        try {
            isArray();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

});



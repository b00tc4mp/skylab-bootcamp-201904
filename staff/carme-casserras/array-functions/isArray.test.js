'use strict'

describe('isArray', function() {
    it('Determines whether the passed value is an array', function() {
        var a = ['c','a','r'];
        var answer = true;
        var result = isArray(a);           
        expect(result, answer);           
      
    });

    it('should break on undefined array', function () {
        
        try {
            isArray();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

});



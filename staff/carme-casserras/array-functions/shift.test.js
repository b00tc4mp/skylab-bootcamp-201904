'use strict';

describe('shift', function() {
    it('removes the first element from an array.', function() {
        var array = [1, 2, 3];

        var answer = [2, 3]

        var result = shift(array);

        expect(result, answer,true);

        
    });

    it('should break on undefined array', function () {
        
        try {
            map();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }

    });
});
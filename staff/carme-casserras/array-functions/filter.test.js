'use strict'

suite('filter', function() {
    test('should filter some items from array with a condition', function() {
        var a = [1, 3, 5, 8, 10, 35, 40, 5, 23, 2, 7];

        var answer = [35, 40, 23];

        var result = filter(a, function(elem){
            if(elem > 10) return true;
            return false;
        })
             
        expect(result.toString, answer.toString);
    });

    test('should break on undefined array', function () {
        
        try {
            filter();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    
    test('should break on undefined callback', function () {
        var a = [1, 3, 5, 8, 10, 35, 40, 5, 23, 2, 7];

        try {
            filter(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
        
});


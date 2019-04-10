'use strict'

describe('reduce', function() {
    it('Reduce on each member of the array resulting in a single output value', function() {
        var array = [1, 2, 3, 4];
        var answer = 10;

        var result = (reduce(array, function(acum, actValue) {
            return acum + actValue;
        }))
        
        expect(result, answer);     
              
      
    });

    it('Reduce on each member of the array resulting in a single output value', function() {
        var array = ['c', 'a', 'r', 'm', 'e'];
        var answer = 'carme';

        var result = (reduce(array, function(acum, actValue) {
            return acum + actValue;
        }))
        
        expect(result, answer);     
              
      
    });


    it('should break on undefined array', function () {
        
        try {
            reduce();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var array = ['c', 'a', 'r', 'm', 'e'];

        try {
            reduce(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });




});



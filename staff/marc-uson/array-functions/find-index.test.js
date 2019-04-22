'use strict';

describe('findIndex', function(){
    it('should return the value of the first index of the array that matches the given condition', function(){
        var array = [1, 2, 5, 10, 20];
        var result = findIndex(array, function(v){return v > 3 ? true : false});

        expect(result, 2);

    });

    it('should return the value of the first index of the array that matches the given condition', function(){
        var array = [1, 2, 5, 10, 20];
        var result = findIndex(array, function(v){return v > 20 ? true : false});

        expect(result, undefined);

    });

    it('should break cause the first parameter is not an array', function(){
        try {
            findIndex();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    
    it('should break cause the first parameter is not an array', function(){
        var array = [1, 2, 5, 10, 20];
        
        try {
            findIndex(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });
});

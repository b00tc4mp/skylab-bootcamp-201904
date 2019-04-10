'user strict'

describe('map', function() {
    it('Creates a new array with the results of calling a function on every element in the calling array', function() {
        var array = [1, 4, 9, 16];
        var answer = [2, 8, 18, 32]
        var result = (map(array, function(elem) {
            return elem * 2;      
        }));

        expect(result, answer, true);     
              
      
    });

    it('should break on undefined array', function () {
        
        try {
            map();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var a = [1, 4, 9, 16];

        try {
            map(a);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });




});


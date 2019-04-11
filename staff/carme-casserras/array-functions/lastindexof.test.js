'user strict'

describe('lastindexof', function() {
    it('Returns the last index at which a given element can be found in the array, or -1 ', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'bison'];
        var elem = 'bison';
        

        var answer = 4;

        var result = lastIndexOf(array,elem);            

        expect(result.toString, answer.toString);

    });

    it('Returns the last index at which a given element can be found in the array, or -1 ', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'bison'];
        var elem = 'cat';

        var answer = -1;

        var result = lastIndexOf(array, elem);            

        expect(result.toString, answer.toString);
        
    });

    it('should break on undefined array', function () {
        
        try {
            lastIndexOf();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

});

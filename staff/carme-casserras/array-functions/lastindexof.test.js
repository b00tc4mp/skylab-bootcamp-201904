'user strict'

describe('lastindexof', function() {
    it('should filter some items from array with a condition', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'bison'];
        // var elem = 'bison';
        var elem ;

        var answer = 4;

        var result = lastIndexOf(array,elem);            

        expect(result.toString, answer.toString);

    });

    it('should filter some items from array with a condition', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'bison'];
        var elem = 'cat';

        var answer = -1;

        var result = lastIndexOf(array, elem);            

        expect(result.toString, answer.toString);
        
    });

    it('should break on undefined array', function () {
        
        try {
            lastIndexof();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

});

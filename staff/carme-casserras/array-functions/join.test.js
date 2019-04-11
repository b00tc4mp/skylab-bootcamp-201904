'user strict'

describe('join', function() {
    it('Creates and returns a new string by concatenating all of the elements in an array', function() {
        var array = ['ant', 'bison', 'camel', 'duck'];
        
        var answer = ('ant, bison, camel, duck');
        

        var result = join(array);
        
        expect(result, answer);             
    });

    it('should break on undefined array', function () {
        
        try {
            indexOf();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

});

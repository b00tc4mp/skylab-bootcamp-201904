'user strict'

describe('reverse', function() {
    it('The first array element becomes the last, and the last array element becomes the first', function() {
        var array = ['one', 'two', 'three'];
        var answer = ['three', 'two', 'one'];

        var result = reverse(array1)
                     
             
        expect(result, answer);
    });

    it('should break on undefined array', function () {
        
        try {
            reverse();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });
    
            
});

/*console.log('DEMO', 'reverse');

var array = ['one', 'two', 'three'];

console.log(reverse(array));*/
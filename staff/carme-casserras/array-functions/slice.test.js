'user strict'

describe('slice', function() {
    it('returns a portion of an array into a new array object selected from begin to end', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'elephant'];
        var a = 2;
        var b = 4;

        var answer = ['camel', 'duck']

        var result = slice(array, a, b);

        expect(result, answer,true);
    });

    it('returns a portion of an array into a new array object selected from begin to end', function() {
        var array = ['ant', 'bison', 'camel', 'duck', 'elephant'];
        var a = 7;
        var b = 4;

        var answer = [];

        var result = slice(array, a, b);

        expect(result, answer,true);
    });


});
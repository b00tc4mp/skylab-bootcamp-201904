'user strict' 

describe('some', function() {
    it ('tests whether at least one element in the array passes the test implemented by the provided function', function() {
        var array = [1, 2, 3, 4, 5];
        var answer = true;

        var result = some(array, function(elem) {return (elem > 2)
        })

        expect(result, answer);
    });

});
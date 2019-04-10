'user strict'

suite('join', function() {
    test('Creates and returns a new string by concatenating all of the elements in an array', function() {
        var a = ['ant', 'bison', 'camel', 'duck', 'bison'];

        var answer = ('ant', 'bison', 'camel', 'duck', 'bison')
        var result = join(a);
        
        expect(result, answer);             
         
             
    });

});
/*console.log('DEMO', 'join');

var a = ['ant', 'bison', 'camel', 'duck', 'bison'];


console.log(join(a));

// ant bison camel duck bison*/
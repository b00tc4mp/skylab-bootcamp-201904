'use strict';

describe('safeBox', function() {
    it('should check if the password is correct', function(){

        var password = '123';
        var string = 'mysecret'
        var value = safeBox(pasword, string);

        expect(array.length, 3)
        
        expect(password, value, true);        
        
        })

    });

    it('should break on undefined array', function () {
            
        try {
            filter();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it()





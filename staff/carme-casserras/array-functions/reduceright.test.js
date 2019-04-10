'user strict'


describe('reduceRight', function() {
    it('Reduce a single value from an array from right to left', function() {
        var array = [1, 2, 3, 4, 5];
        var answer = 15;

        var result = (reduceRight(array, function(acum, actValue) {
            return acum + actValue;
        }))
        
        expect(result, answer);     
              
    });

    it('Reduce on each member of the array resulting in a single output value', function() {
        var array = ['c', 'a', 'r', 'm', 'e'];
        var answer = 'emrac';

        var result = (reduceRight(array, function(acum, actValue) {
            return acum + actValue;
        }))
        
        expect(result, answer);     
              
      
    });


    it('should break on undefined array', function () {
        
        try {
            reduceRight();

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not an array');
        }
    });

    it('should break on undefined callback', function () {
        var array = ['c', 'a', 'r', 'm', 'e'];

        try {
            reduceRight(array);

            throw Error('should not reach this point');
        } catch (error) {
            expect(error.message, 'undefined is not a function');
        }
    });


});


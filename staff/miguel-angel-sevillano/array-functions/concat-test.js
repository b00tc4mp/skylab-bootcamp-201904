'use strict'



describe('concat', function() {
    it('should break if its not undefined', function () {

        try{
            concat();

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'undefined');
        }
    })

    it('Should break  if its not an array',function (){
        try{
            concat("c");

            throw Error('should not reach this point');
        }catch (error){
            expect(error.message,'not an array');
        }
    })
    it('shoud return a concated array',function(){

        var a =[1,2,3,4];
        var b =[5,6];
        var actual =[];
        var expected =[1,2,3,4,5,6]
        actual = concat(a,b);

        for(var i =0; i<actual.length; i++){
            expect(actual[i],expected[i]);
        }
    })

        


    
});
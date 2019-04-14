'use strict';



//# CONSTRUCTOR TEST--------------------------------------------------------------

describe('hooray', function () {
    describe('constructor', function () {
          it('should construct an empty hooray when no arguments', function () {
            var hooray = new Hooray;

            expect(hooray.length).toBe(0);
            expect(Object.keys(hooray).length).toBe(1);
        });

          it('should construct a non-empty hooray when existing arguments', function () {
            var hooray = new Hooray(1, 2, 3);

            expect(hooray.length).toBe(3);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
            expect(Object.keys(hooray).length).toBe(4);
        });

          it('should construct an empty hooray with length equal to when only one numeric argument', function () {
            var hooray = new Hooray(1);

            expect(hooray.length).toBe(1);
            expect(Object.keys(hooray).length).toBe(1);
        });

          it('should construct a non-empty hooray with only one non-numeric argument', function () {
            var hooray = new Hooray('1');

            expect(hooray.length).toBe(1);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: '1', length: 1 }));
            expect(Object.keys(hooray).length).toBe(2);
        });
    });

//# PUSH TEST ------------------------------------------------------------

    describe('push', function () {
          it('should add a value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4);

            expect(hooray.length).toBe(4);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, length: 4 }));
        });

          it('should add multiple values at the end of an hooray in order', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push(4, 5);

            expect(hooray.length).toBe(5);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5 }));
        });

          it('should not add a non-provided value at the end of an hooray', function () {
            var hooray = new Hooray(1, 2, 3);

            var length = hooray.push();

            expect(hooray.length).toBe(3);
            expect(length).toBe(hooray.length);
            expect(JSON.stringify(hooray)).toBe(JSON.stringify({ 0: 1, 1: 2, 2: 3, length: 3 }));
        });
    });


//#FOR EACH TEST---------------------------------------


    describe('forEach', function () {
          it('should itearate a hooray without altering it', function () {
            var hooray = new Hooray(1, 2, 3);

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(hooray).toEqual(jasmine.objectContaining({ 0: 1, 1: 2, 2: 3, length: 3 }));
        });

        it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;

            var result = new Hooray;

            hooray.forEach(function (v, i) { result.push(v); });

            expect(result.length).toBe(0);
        });

          it('should break on undefined callback', function () {
            var hooray = new Hooray(1, 2, 3);

           expect(function(){hooray.forEach()}).toThrowError();
            
        });
    });

//# CONCAT TEST------------------------------

    describe('Concat', function() {

    
        it('should do nothing if hooray has not content', function () {
            var hooray = new Hooray;
            var arr1 = new Hooray;

            var result = hooray.concat(arr1);

            expect(result.length).toBe(0);
        });

    
        it('shoud return a concated array',function(){

            var a = new Hooray(1,2);
            var arr2 = new  Hooray(2,3);

            var result = a.concat(arr2);
            var final = {0: 1, 1: 2, 2: 2, 3: 3, length:4};
           
    
            expect(result).toEqual(jasmine.objectContaining(final));
        });
       
    });

//# EVERY TEST-------------------------------------------------



    describe('every', function () {
        it('should return true if items matching condition', function () {
            
            var array = new Hooray(1,2,3);

            var result = array.every(function(v){return v>0}); //si el reusltado del a funcion es true

            expect(result).toBe(true);
        });


        it('should return false on any of the items not matching the condition', function () {
            var array = new Hooray(1,2,3);

            var result = array.every(function(v){ return v<0});

            expect(result).toBe(false);
        });

    

        it('should have a callback function ', function () {
            
            var array = new Hooray(1,2,3);

            var result = array.every(function(){});

            expect(result).toBe(false);


        });


    });



    //# FILTER TEST ---------------------------------------------------------------------------

    describe('filter', function() {
        
       
        it('should have a callback function ', function () {
            
            var array = new Hooray(1,2,3);

            var result = array.every(function(){});

            expect(result).toBe(false);


        });

        it('should return an array with the filtered conditions by callback',function(){

            var hooray = new Hooray(2,3,4,5,6,7);
            var expected = hooray.filter(function(v){ return v > 2});
          
           
            expect(expected).toEqual(jasmine.objectContaining({0:3,1:4,2:5,3:6,4:7,length:5}));
        })
    });

    //#INDEX_OF TEST --------------------------------------

        

    describe('index_of', function() {
        
        it('should break if its empty', function () {
        
            var hooray =new Hooray(1,2,3);

            expect(hooray.index_Of(2)).toBe(1);
        })

        it('should return the index of an item in array',function(){
            
            var array = new Hooray(1,4,5,6,3,4,5);
            var index = array.index_Of(3);

            expect(index).toBe(4);
        })
        it('should return the -1 if the item dont exist',function(){
            
            var array = new Hooray(1,4,5,6,3,4,5);
            var index = array.index_Of(0);

            expect(index).toBe(-1);
        })
        
    });


//ISHOORAY TEST -----------------------------------------------------------------------------------


    describe('isHooray', function() {

    
        it('shoud return true if item is hooray', function (){

            var hooray = new Hooray;
            var test = new Hooray(1);
            var result = hooray.isHooray(test);

            expect(result).toBe(true);

        })

        
        it('shoud return false if item is not a  hooray or empty', function (){

            var hooray = new Hooray;
            var test = 10;
            var result = hooray.isHooray(test);
    
            expect(result).toBe(false);
    
        })

    
        
    });


    //#JOIN TEST -------------------------------------------------------------------------------------------


    describe('join', function() {
    
        it('should break if dont join the item in to the hooray',function(){

            var hooray = new Hooray(1,2,3,4,5);
            var final = hooray.join("=");
            
            
            expect(final).toBe('1=2=3=4=5');
        })
    });

    //# LAST INDEX OF TEST-------------------------------------------------------------------------------------



    describe('last index of',function(){
    

        it('should iterate trough the array and return the last index of the value passed by',function(){

            var hooray = new Hooray(1,2,3,4,5,6,7);
            var result = hooray.lastindexof(3);
                    

            expect(result).toBe(2);

        })
        it('should iterate trough the array and return the last index of the value starting at index provided',function(){

            var hooray = new Hooray(1,2,3,4,5,6,7);
            var result = hooray.lastindexof(3,5);
                
    
            expect(result).toBe(2);
    
        })
        it('should return false if there is no item to compare ',function(){

            var hooray = new Hooray(1,2,3,4,5,6,7);
            var result = hooray.lastindexof(10);
                
    
            expect(result).toBe(false);
    
        })
    })

    //#MAP TEST ------------------------------------------------------------------------------------------------------------------

        
    describe('map', function() {
        
        it('should iterate trough the hooray and use the first value of the array if any value is providen ',function(){

            var hooray= new Hooray(1,2,3,4,5);
            var expected= hooray.map(function(v,a){return v+a});
        
            expect(expected).toEqual(jasmine.objectContaining({0:2,1:4,2:6,3:8,4:10 ,length :5 }));
    
        })
        it('should iterate trough the hooray and apply the value added to each item',function(){

            var hooray= new Hooray(1,2,3,4,5);
            var expected= hooray.map(function(v,a){return v*a},2);
            
            expect(expected).toEqual(jasmine.objectContaining({0:2,1:4,2:6,3:8,4:10 ,length :5 }));

        })

        
    });

    //# REDCUE TEST--------------------------------------------------------------------------------------------------------------


    
    describe('reduce',function(){
    
        it('should iterate trough the hooray and aplly the value of the callback function',function(){

            var hooray = new Hooray(1,2,3,4,5,6);
            var expected = hooray.reduce(function(a,b){return a+b},4);
            

            expect(expected).toBe(25);

        })
        it('should iterate trough the hooray and aplly the first index value of the hooray on the callback functionif there is no value paseed by',function(){

            var hooray = new Hooray(1,2,3,4,5,6);
            var expected = hooray.reduce(function(a,b){return a+b});
        
    
            expect(expected).toBe(22);
    
        })
    
    
    })

    
    //# REDCUE-RIGHT TEST--------------------------------------------------------------------------------------------------------------


    
    describe('reduce-rigth',function(){
    
        it('should iterate trough the hooray from right and aplly the value of  the callback function',function(){

            var hooray = new Hooray(1,2,3,4,5,6);
            var expected = hooray.reduceRight(function(a,b){return a*b},4);
            

            expect(expected).toBe(2880);

        })
        it('should iterate trough the hooray from right and aplly the first index value of the hooray on the callback function if there is no value paseed by',function(){

            var hooray = new Hooray(1,2,3,4,5,6);
            var expected = hooray.reduceRight(function(a,b){return a-b});
        
    
            expect(expected).toBe(-19);
    
        })
    
    
    })

    //# REVERSE TEST-----------------------------------------------------------------------------------------------

    
    describe('Reverse', function() {
     
        it('shoud shitch the order of the first and last items of an array', function (){

            var hooray = new Hooray(1,2,3,4);
            var expected = hooray.reverse();
        
            expect(expected).toEqual(jasmine.objectContaining({0:4,1:2,2:3,3:1, length:4}));
        })
   


    
});

    //#  SHIFT-TEST ----------------------------------------------------------------------------------------------------

        
    describe('Shift', function() {
     

        it('should return the first element of the hooray removed',function(){

            var hooray = new Hooray(1,2,3,4,5);
            var expected = hooray.shift(); 
            expect(expected).toBe(1);
        })

        it('should return undefinded if array length its 0',function(){

            var hooray = new Hooray;
            var expected = hooray.shift(); 
            expect(expected).toBe(undefined);

            
        })
    });

    //# SLICE-TEST-------------------------------------------------------------------------------------------------------------

        
    describe('slice', function() {
    
        it('should break if its not a number', function (){

            expect(function(){hooray.slice()}).toThrowError();
        })
        it('should return an array with the substracted elements by index first position and end position',function(){

            var hooray = new Hooray(1,2,3,4,5);
            var expected = hooray.slice(1,3); 
            expect(expected).toEqual(jasmine.objectContaining({0:2,1:3, length:2}));


        })

        
    });


    //# SOME-TEST -------------------------------------------------------------------------------


    

    describe('some',function(){
      
    
        it('should iterate trough the array and return true if have any coincidences',function(){

            var hooray = new Hooray(2,3,4,6,9);
            var expected = hooray.some(function(a,b){ return a<b},2);
                
            expect(expected).toBe(true);

        })


        it('should return false if the array is empty',function(){

            var hooray = new Hooray;
            var expected = hooray.some(function(a,b){ return a<b},2);
                
            expect(expected).toBe(false);
    
            })
    })



    //# SPLICE -TEST --------------------------------------------------------------------------------------------------------------

    describe('splice', function() {
       
        it('should iterate trough the array and add a value on index specified ',function(){
    
            var hooray = new Hooray(1,2,3,4,5,6);
            var expected = hooray.splice(2,0,5);

            expect(expected).toEqual(jasmine.objectContaining({0:1,1:2,2:5,3:3,4:4,5:5,6:6, length: 7}));
    
        })
        it('should iterate trough the array and substract a value on the index spexified ',function(){
    
            
            var hooray = new Hooray(1,2,3,4,5,6);
            var expected = hooray.splice(2,1);

            expect(expected).toEqual(jasmine.objectContaining({0:1,1:2,2:4,3:5,4:6, length: 5}));
     
         })

         it('should iterate trough the array and substract and add a value on the index spexified ',function(){
    
            
            var hooray = new Hooray(1,2,3,4,5,6);
            var expected = hooray.splice(2,1,7);

            expect(expected).toEqual(jasmine.objectContaining({0:1,1:2,2:7,3:4,4:5,5:6, length: 6}));
     
         })
       
    });





    //#SORT-TEST------------------------------------------------------------------------------------------------------------------


    describe('sort', function() {
       
        it('should iterate trough the hooray and sort it ',function(){
    
            var hooray = new Hooray(3,7,9,2,1,4);
            var expected = hooray.sort();

            expect(expected).toEqual(jasmine.objectContaining({0:1,1:2,2:3,3:4,4:7,5:9, length: 6}));
    
        })


    })




});




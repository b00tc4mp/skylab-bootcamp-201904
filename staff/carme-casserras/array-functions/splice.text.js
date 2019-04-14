'user strict' 

describe('splice', function() {
    it ('changes the contents of an array by removing or replacing existing elements and/or adding new elements', function() {
        var array = ['Jan', 'Feb', 'March', 'April', 'June'];
        var answer = ['Jan', 'Feb', 'March', 'April', 'May'];
        var start = 4;
        var delet = 1;
        var change = 'May'
        var result = splice(array, start, delet, change)
        

        expect(result, answer, true);
    });
   
});
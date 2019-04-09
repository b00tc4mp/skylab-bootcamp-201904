    console.log('DEMO', 'reduce');

    var array = [1, 2, 3, 4];


console.log('case 1');
 console.log(reduce(array, function(acum, actValue) {
     return acum + actValue;
 }))
 
// [13] 

var array = ['c', 'a', 'r', 'm', 'e'];

console.log('case 2');
 console.log(reduce(array, function(acum, actValue) {
     return acum + actValue;
 }))
 
// carme 
'user strict'

console.log('DEMO', 'filter');

console.log('case 1');
var a = [1, 3, 5, 8, 10, 35, 40, 5, 23, 2, 7];


console.log(filter(a, function(elem){
    if(elem > 10) return true;
    return false;
})) 

//35, 40, 23

console.log('case 2');

try {
    filter();
    console.error('should not reach this point');
} catch(error) {
    console.error(error.message);
}


try {
    filter([1,2,3]);
    console.error('should not reach this point')
} catch(error) {
    console.error(error.message);
}
 










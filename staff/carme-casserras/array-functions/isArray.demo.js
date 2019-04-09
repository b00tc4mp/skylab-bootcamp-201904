console.log('DEMO', 'isArray');


console.log('case 1');
var a = ['c','a','r'];

console.log(isArray(a)) // true

console.log('case 2');
var b ='carme';
console.log(isArray(b)) // false

console.log('case 3');

try {
    isArray([1,2,3,4])
    console.error('should not reach this point');
} catch(error) {
    console.error(error.message)
}

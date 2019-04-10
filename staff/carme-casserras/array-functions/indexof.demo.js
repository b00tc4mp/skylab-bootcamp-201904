'user strict'

console.log('DEMO', 'indexof');

var a = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log('case 1');
console.log(indexof(a, 'camel'));

console.log('case 2');

try {
    indexof([1,2,3,])
    console.error('should not reach this point')
} catch(error) {
    console.error(error.message);
} 
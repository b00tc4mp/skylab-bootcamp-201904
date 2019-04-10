console.log('DEMO', 'concat');

console.log('case 1');
var a = ['c','a','r'];
var b = ['d', 'a', 'n', 'i'];

console.log('case 1');
console.log(concat(a,b)) 
// c,a,r,d,a,n,i


console.log('case 2');

var a = (car);
var b = ['d', 'a', 'n'];

try {
    concat(a, b)

    console.error('should not reach this point');
} catch(error) {
    console.erorr(error.message);
}


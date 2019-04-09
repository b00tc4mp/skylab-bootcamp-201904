console.log('DEMO', 'lastIndexOf');


console.log('case 1');

var a = ['ant', 'bison', 'camel', 'duck', 'bison'];
var b = ('cat');

console.log(lastIndexOf(a, b));

// -1

console.log('case 2');

var a = ['ant', 'bison', 'camel', 'duck', 'bison'];
var b = ('bison');

console.log(lastIndexOf(a, b));

// 4
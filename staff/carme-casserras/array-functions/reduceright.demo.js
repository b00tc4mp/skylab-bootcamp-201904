console.log('DEMO', 'reduceright');

var array = [1, 2, 3, 4, 5];

console.log('case 1');
console.log(reduceRight(array, function(acum, nextVal) {
    return acum + nextVal;
}))

// [13] 

var array = ['c', 'a', 'r', 'm', 'e'];

console.log('case 2');
console.log(reduceRight(array, function(acum, nextVal) {
    return acum + nextVal;
}))

// emrac
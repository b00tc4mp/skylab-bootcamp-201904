console.log('DEMO', 'filter');


var a = [1, 3, 5, 8, 10, 35, 40, 5, 23, 2, 7];

console.log(filter(a, function(elem){
    if(elem > 10) return true;
    return false;
})) 

//35, 40, 23










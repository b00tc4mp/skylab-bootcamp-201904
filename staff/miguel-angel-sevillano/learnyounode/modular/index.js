var mymodule = require('./modular')
var callback = function(error,data){
    if(error) console.log(error)
    data.forEach(element => {
        console.log(element)
    });
}

mymodule(process.argv[2],process.argv[3],callback)


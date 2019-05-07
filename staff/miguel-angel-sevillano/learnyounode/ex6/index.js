const https = require('http');


var results = function callback(response){
    response.setEncoding('utf8')
    response.on("data" , function(data){
    
        console.log(data)
    })
}

https.get(process.argv[2],results)




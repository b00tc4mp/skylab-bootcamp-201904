var fs = require('fs');
var path = require('path');
var results = []



module.exports = function files(route,extension,callback){



fs.readdir(route, function(err, list){

    if(err) return callback(err)
    
    list.forEach(function (res){

        if(path.extname(res) === '.' +extension){
            results.push(res)
        }
    })
 
     return callback(null, results)

  });

}


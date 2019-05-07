

var fs = require('fs');
var path = require('path');


fs.readdir(process.argv[2], function(err, files){
   filesList = files.filter(function(e){
      if(path.extname(e)=== `.${process.argv[3]}`) console.log(e)
    });
   
  });


var http = require('http')
var fs = require('fs');



var server = http.createServer(function (req, res) {
  
    
    fs.createReadStream(process.argv[3]).pipe(res)

        res.writeHead(200,{'content-type': 'text/plain'});


})
server.listen(process.argv[2])

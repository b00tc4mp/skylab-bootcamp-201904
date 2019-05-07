var http = require('http')

let send = "/api/parsetime"

var server = http.createServer(function (req, res) {
  
    res.writeHead(200,{'content-type': 'text/plain'});
    

        


})
server.listen(process.argv[2])

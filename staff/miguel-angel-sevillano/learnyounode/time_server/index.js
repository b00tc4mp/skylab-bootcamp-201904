var strftime = require('strftime')
var net = require('net')


var server = net.createServer(function (socket) {
    
    
    
   
    socket.write(strftime('%F %R', new Date()))
    socket.end('\n')
   
   
     
    
    })
     
     
     server.listen(process.argv[2])

    
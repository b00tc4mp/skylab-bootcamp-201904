// let io = require('../index')

// io.on('connection', (socket) => {
//     console.log(`Made socket conection with ${socket.id}`)

//     function newRoom() {
//         // Create a unique Socket.IO Room
//         var thisGameId = ( Math.random() * 100000 ) | 0
    
//         // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
//         this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id})
    
//         // Join the Room and wait for the players
//         this.join(thisGameId.toString())
//     }

//     // socket.on('switchRoom', newroom => {
//     //     // leave the current room (stored in session)
//     //     socket.leave(socket.room);
//     //     // join new room, received as function parameter
//     //     socket.join(newroom);
//     //     socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
//     //     // sent message to OLD room
//     //     socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
//     //     // update socket session room title
//     //     socket.room = newroom;
//     //     socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
//     //     socket.emit('updaterooms', rooms, newroom);
//     // })
    
//     socket.on("chat", data =>{
//         io.emit("chat", data) // to allll the users
//     })

//     socket.on("typing", data => {
//         socket.broadcast.emit("typing", data)
//     })

// })
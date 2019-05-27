//make connection with a front end socket

const socket = io.connect('http://localhost:7000')

//Query dom

const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    room = document.getElementById('room')


// //emit events

// btn.addEventListener("click", () => { //aqui emitimos el mensaje

//     if (message.value && handle.value) {
//         socket.emit("chat", {
//             message: message.value,
//             handle: handle.value
//         })
//         message.value = ""
//     }
// })

// message.addEventListener("keypress", () => { //aqui emitimos el mensaje de estar escribiendo
//     socket.emit("typing", handle.value)
// })

// //listen

// socket.on('chat', data => { //aqui recivimos los mensajes que llegan por el socket en la categoria chat
//     output.innerHTML += `<p><stron>${data.handle}:</strong> ${data.message} </p>`
//     feedback.innerHTML = ""
// })

// socket.on("typing", data => { //aqui recivimos los mensajes que llegan por el socket en la categoria typing
//     feedback.innerHTML = `${data} is typing!`
// })

// socket.on("typing", data => { //aqui recivimos los mensajes que llegan por el socket en la categoria typing
//     feedback.innerHTML = `${data} is typing!`
// })



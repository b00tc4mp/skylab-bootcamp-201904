require('dotenv').config()

const express = require('express')
const package = require('./package.json')
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
// const socket = require('socket.io')


const { env: { PORT, URL }, argv: [, , port = PORT || 8080], } = process;
(async () => {

    // client = await mongoose.connect(url, { useNewUrlParser: true }) // esperamos que se levabte mongo

    //express

    const app = express()

    app.use(cors())

    app.use('/api', routes)

    const server = app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))

    //Static file
    app.use(express.static('public'))

    // //Socket conexion
    
    // const io = socket(server)

    // module.exports = io
    // require('./sockets/socket')

    app.use(function (req, res, next) {
        res.status(404).json({ error: 'Not found.' })
    })
})()






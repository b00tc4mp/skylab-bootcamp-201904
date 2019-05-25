const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose= require('mongoose')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

const app = express()

const url = 'mongodb://localhost/rest-api'; // url donde esta la base de datos

(async () => {
    client = await mongoose.connect(url, { useNewUrlParser: true }) // esperamos que se levabte mongo

    app.use(cors())

    app.post('/user', jsonParser, (req, res) => { // ruta simple user para registrar, devuelve un Ok.
        const { body: { name, surname, email, password } } = req

        try {

            logic.registerUser(name, surname, email, password)
                .then(() => res.status(201).json({ message: 'Ok, user registered. ' }))
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    app.post('/auth', jsonParser, (req, res) => { //  Ruta auth para authnticar el user devolverá token
        const { body: { email, password } } = req

        try {
            logic.authenticateUser(email, password) // cojerá token
                .then(id => {

                    let newtoken = jwt.sign({ sub: id }, 'Ladonahemovile', { expiresIn: '2h' })
                    return res.json({ token: newtoken })
                })
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    app.get('/user', jsonParser, (req, res) => { // Un get + ruta user y ID para obtener datos de usuario
        let { headers: { authorization: token } } = req
        token = token.split(' ')[1]

        try {
            let payload = jwt.verify(token, 'Ladonahemovile')

            const { sub } = payload

            return logic.retrieveUser(sub) // cojerá token
                .then(({ name, surname, email }) => res.json({ name, surname, email }))
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    app.post('/user/privateNote', jsonParser, (req, res) => { 
        let { headers: { authorization: token }, body: { text } } = req
        token = token.split(' ')[1]
        
        try {
            let payload = jwt.verify(token, 'Ladonahemovile')

            const { sub } = payload

            return logic.addNote(sub, text, true) // cojerá token
                .then(() => res.json({ message: 'Ok'}))
                .catch(({ message }) => {
                    res.status(400).json({ error: message})
                })
        } catch ({ message }) {
            res.status(400).json({ error: message})
        }
    })

    app.post('/user/publicNote', jsonParser, (req, res) => { 
        let { headers: { authorization: token }, body: { text } } = req
        token = token.split(' ')[1]

        try {
            let payload = jwt.verify(token, 'Ladonahemovile')

            const { sub } = payload

            return logic.addNote(sub, text, false) // cojerá token
                .then(() => res.json({ message: 'Ok'}))
                .catch(({ message }) => {
                    res.status(400).json({ error: message})
                })
        } catch ({ message }) {
            res.status(400).json({ error: message})
        }
    })

    app.get('/privateNotes', jsonParser, (req, res) => { // Un get + ruta search
        let { headers: { authorization: token } } = req
        token = token.split(' ')[1]

        try {
            let payload = jwt.verify(token, 'Ladonahemovile')

            const { sub } = payload

            return logic.retrieveUserNotes(sub) // cojerá token
                .then((notes) => res.json({ notes }))
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    app.get('/publicNotes', jsonParser, (req, res) => { // Un get + ruta search
        let { headers: { authorization: token } } = req
        token = token.split(' ')[1]

        try {
            let payload = jwt.verify(token, 'Ladonahemovile')

            const { sub } = payload

            return  logic.retrievePublicNotes(sub) // cojerá token
                .then((notes) => res.json({ notes }))
                .catch(({ message }) => {
                    res.status(400).json({ error: message })
                })
        } catch ({ message }) {
            res.status(400).json({ error: message })
        }
    })

    app.use(function (req, res, next) {
        res.redirect('/')
    })

    app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))

})()
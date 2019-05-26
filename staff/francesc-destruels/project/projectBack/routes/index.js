const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
//const handlerError = require('.handle-errors')
const jwt = require('jsonwebtoken')
//const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()


//User Creation I only require Nickname, Age, Email && Password to register, Nickname and Email has to be Unique!
router.post('/user', jsonParser, (req, res) => {
    const { body: { nickname, age, email, password } } = req

    try {

        logic.registerUser(nickname, age, email, password)
            .then(() => res.status(201).json({ message: 'Ok, user created. ' }))
            .catch(({ message }) => {
                res.status(400).json({ error: message })
            })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

//User authentication using Nickname || Email && password
router.post('/auth', jsonParser, (req, res) => {
    const { body: { userNameOrEmail, password } } = req

    try {
        logic.authenticateUser(userNameOrEmail, password) // cojerá token
            .then(id => {

                let newtoken = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '5h' })
                return res.json({ token: newtoken })
            })
            .catch(({ message }) => {
                res.status(400).json({ error: message })
            })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

//Retriving User information 

router.get('/user', jsonParser, (req, res) => { // Un get + ruta user y ID para obtener datos de usuario
    let { headers: { authorization: token } } = req
    token = token.split(' ')[1]

    try {
        let payload = jwt.verify(token, 'Ladonahemovile')

        const { sub } = payload

        return logic.retrieveUser(sub)
            .then(({ nickname, age, email, userPicture }) => res.json({ nickname, age, email, userPicture }))
            .catch(({ message }) => {
                res.status(400).json({ error: message })
            })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

module.exports = router



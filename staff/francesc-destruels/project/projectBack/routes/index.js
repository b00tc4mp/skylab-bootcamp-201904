const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
//const handlerError = require('.handle-errors')
const jwt = require('jsonwebtoken')
//const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()


//Get Hello world
router.get('/hello', jsonParser, (req, res) => {

    console.log("I am here")

    res.status(201).json({ Mensaje: "Eres muy guapeton" })

})


//User Creation I only require Nickname, Age, Email && Password to register, Nickname and Email has to be Unique!
router.post('/users', jsonParser, async (req, res) => {
    const { body: { nickname, age, email, password } } = req

    try {
        await logic.registerUser(nickname, age, email, password)
        res.status(201).json({ message: 'Ok, user created. ' })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

//User authentication using Nickname || Email && password
router.post('/auth', jsonParser, async (req, res) => {
    const { body: { userNameOrEmail, password } } = req

    try {
        const id = await logic.authenticateUser(userNameOrEmail, password) // cojerá token

        let newtoken = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '5h' })
        return res.json({ token: newtoken })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

//Retriving User information

router.get('/user', jsonParser, async (req, res) => { // Un get + ruta user y ID para obtener datos de usuario
    let { headers: { authorization: token } } = req
    token = token.split(' ')[1]

    try {
        let payload = jwt.verify(token, 'Ladonahemovile')

        const { sub } = payload

        const { nickname, age, email, userPicture } = await logic.retrieveUser(sub)
        
        res.json({ nickname, age, email, userPicture })

    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
})

module.exports = router



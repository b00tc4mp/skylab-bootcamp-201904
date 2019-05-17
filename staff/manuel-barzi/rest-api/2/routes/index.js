const express = require('express')
const bodyParser = require('body-parser')
const logic = require('../logic')
const handleErrors = require('./handle-errors')
const jwt = require('jsonwebtoken')
const auth = require('./auth')

const { env: { JWT_SECRET } } = process

const jsonParser = bodyParser.json()

const router = express.Router()

router.post('/users', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    handleErrors(() =>
        logic.registerUser(name, surname, email, password)
            .then(() => res.status(201).json({ message: 'Ok, user registered.' })),
        res)
})

router.post('/users/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    handleErrors(() =>
        logic.authenticateUser(email, password)
            .then(sub => {
                const token = jwt.sign({ sub }, JWT_SECRET, { expiresIn: '47m' })

                res.json({ token })
            }),
        res)
})

router.get('/users', auth, (req, res) => {
    handleErrors(() => {
        const { userId } = req

        return logic.retrieveUser(userId)
            .then(user => res.json(user))
    },
        res)
})

router.post('/ducks/:id/fav', auth, (req, res) => {
    handleErrors(() => {
        const { userId, params: { id } } = req

        return logic.toggleFavDuck(userId, id)
            .then(() => res.json({ message: 'Ok, duck toggled.' }))
    },
        res)
})

router.get('/ducks/fav', auth, (req, res) => {
    handleErrors(() => {
        const { userId } = req

        return logic.retrieveFavDucks(userId)
            .then(ducks => res.json(ducks))
    },
        res)
})

router.get('/ducks', auth, (req, res) => {
    handleErrors(() => {
        const { userId, query: { query } } = req

        return logic.searchDucks(userId, query)
            .then(ducks => res.json(ducks))
    },
        res)
})

router.get('/ducks/:id', auth, (req, res) => {
    handleErrors(() => {
        const { userId, params: { id } } = req

        return logic.retrieveDuck(userId, id)
            // .then(duck => res.json(duck))
            .then(res.json.bind(res))
    },
        res)
})

// TODO other routes (update, delete...)

module.exports = router
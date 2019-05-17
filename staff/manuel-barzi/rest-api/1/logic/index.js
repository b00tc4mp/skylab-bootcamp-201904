const validate = require('../common/validate')
const userApi = require('../data/user-api')
const duckApi = require('../data/duck-api')
const { LogicError, UnknownError } = require('../common/errors')
const _token = require('../common/token')

const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.create(email, password, { name, surname })
            .then(response => {
                if (response.status === 'OK') return
                else throw new LogicError(response.error)
            })
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') return response.data.token
                else throw new LogicError(response.error)
            })
    },

    retrieveUser(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        const { id } = _token.payload(token)

        return userApi.retrieve(id, token)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { name, surname, username: email } } = response

                    return { name, surname, email }
                } else throw new LogicError(response.error)
            })
    },

    searchDucks(token, query) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])

        const { id } = _token.payload(token)

        return userApi.retrieve(id, token)
            .then(response => {
                if (response.status === 'OK') {
                    return duckApi.searchDucks(query)
                        .then(ducks => ducks instanceof Array ? ducks : [])
                } else throw new LogicError(response.error)
            })
    },

    retrieveDuck(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string' }
        ])

        const { id: _id } = _token.payload(token)

        return userApi.retrieve(_id, token)
            .then(response => {
                if (response.status === 'OK') {
                    return duckApi.retrieveDuck(id)
                } else throw new LogicError(response.error)
            })
    },

    toggleFavDuck(token, id) { // TODO check duck id is valid (it exists) 
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        const { id: _id } = _token.payload(token)

        return userApi.retrieve(_id, token)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { favs = [] } = data

                    const index = favs.indexOf(id)

                    if (index < 0) favs.push(id)
                    else favs.splice(index, 1)

                    return userApi.update(_id, token, { favs })
                        .then(() => { })
                }

                throw new LogicError(response.error)
            })
    },

    retrieveFavDucks(token) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        const { id: _id } = _token.payload(token)

        return userApi.retrieve(_id, token)
            .then(response => {
                const { status, data } = response

                if (status === 'OK') {
                    const { favs = [] } = data

                    if (favs.length) {
                        const calls = favs.map(fav => duckApi.retrieveDuck(fav))

                        return Promise.all(calls)
                    } else return favs
                }

                throw new LogicError(response.error)
            })
    }
}

module.exports = logic
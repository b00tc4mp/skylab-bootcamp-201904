import normalize from '../common/normalize'
import validate from '../common/validate'
import restApi from '../data/rest-api'
import { LogicError } from '../common/errors'


const logic = {

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userToken__)
    },

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.create(email, password, { name, surname })
            .then(response => {
                if (!response.ok) throw new LogicError('Email already registred')
            })
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return restApi.authenticate(email, password)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad identification")
            })
            .then(response => {
                
                this.__userToken__ = response.token
            })
    },

    retrieveUser() {
        return restApi.retrieve(this.__userToken__)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
            .then(response => {
                const { name, surname, email } = response
                return { name, surname, email }
            })
    },

    logoutUser() {
        sessionStorage.clear()
    },

    searchDucks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])

        return restApi.searchDucks(this.__userToken__, query)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
            .then(({ ducks }) => {
                return ducks instanceof Array ? ducks : []
            })
    },

    retrieveDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return restApi.retrieveDuck(this.__userToken__, id)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
            .then( ({duck}) => duck)
    },

    toggleFavDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }

        ])

        return restApi.toggleFavDuck(this.__userToken__, id)
            .then(response => {
                if (response.status === 200){}
                else throw new LogicError(response.error)
            })
    },

    retrieveFavDucks() {
        return restApi.retrieveFavDucks(this.__userToken__)
            .then(response => {
                
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
            .then(({ducks}) => ducks instanceof Array ? ducks : [])
        }
}

export default logic
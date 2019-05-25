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
        return restApi.retrieveUser(this.__userToken__)
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

    newPrivateNote(text) {
        validate.arguments([
            { name: 'text', value: text, type: 'string' }
        ])

        return restApi.newPrivateNote(this.__userToken__, text)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
    },

    newPublicNote(text) {
        validate.arguments([
            { name: 'text', value: text, type: 'string' }
        ])

        return restApi.newPublicNote(this.__userToken__, text)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
    },

    retrievePrivateNotes() {
        return restApi.retrievePrivateNotes(this.__userToken__)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
            .then(({ notes }) => {
                return notes instanceof Array ? notes : []
            })
    },

    retrievePublicNotes() {
        return restApi.retrievePublicNotes(this.__userToken__)
            .then(response => {
                if (response.status === 200) return response.json()
                else throw new LogicError("Bad Way")
            })
            .then(({ notes }) => {
                return notes instanceof Array ? notes : []
            })
    }
}

export default logic
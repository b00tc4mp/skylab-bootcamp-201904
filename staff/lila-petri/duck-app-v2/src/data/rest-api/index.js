import validate from '../../common/validate'
import call from '../../common/call'

const restApi = {
    __url__: 'http://localhost:8080/api',

    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])
        return call(`${this.__url__}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password }),
            timeout: this.__timeout__
        })
            .then(response => response.json())

    },

    authenticateUser(email, password){
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            timeout: this.__timeout__
        })
        .then(response => response.json())
    },
    retrieveUser(token){
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/users`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
        .then(response => response.json())
    },
    //TO DO update user

    searchDucks(token, query) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])
        
        return call(`${this.__url__}/ducks?query=${query}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

            .then(response => response.json())
    },

    retrieveDuck(token, id) {
        validate.arguments([
            { name: 'token', value: token, type: 'string',  notEmpty: true  },
            { name: 'id', value: id, type: 'string' }
        ])

        return call(`${this.__url__}/ducks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => response.json())
    }

}
export default restApi
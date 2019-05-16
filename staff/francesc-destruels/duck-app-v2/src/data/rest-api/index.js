import validate from '../../common/validate'
import call from '../../common/call'

const restApi = {
    __url__: 'http://localhost:8080',
    __timeout__: 0,

    create(email, password, data) { // my way
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true, optional: true }
        ])

        return call(`${this.__url__}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, ...data }),
            timeout: this.__timeout__
        })
    },

    authenticate(email, password) { // my way
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            timeout: this.__timeout__
        })
    },

    retrieve(token) { // my way
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true }
        ])

        return call(`${this.__url__}/user`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },

    // update(token, data) {
    //     validate.arguments([
    //         { name: 'token', value: token, type: 'string', notEmpty: true },
    //         { name: 'data', value: data, type: 'object', notEmpty: true }
    //     ])

    //     return call(`${this.__url__}/user`, {
    //         method: 'UPDATE',
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data),
    //         timeout: this.__timeout__
    //     })
    //         .then(response => response.json())
    // },

    searchDucks(token, query) { //my way
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])
        
        return call(`${this.__url__}/duckSearch?q=${query}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },

    retrieveDuck(token, id) { // my way
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string' }
        ])

        return call(`${this.__url__}/duckDetail/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },

    toggleFavDuck(token, id) {

        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'id', value: id, type: 'string' }
        ])

        return call(`${this.__url__}/user/favs/${id}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: this.__timeout__
        })
    },

    retrieveFavDucks( token ) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
        ])

        return call(`${this.__url__}/user/favs`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    },
}

export default restApi
// import validate from '../../common/validate'
import call from '../../common/call'
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const restApi = {
    __url__: 'http://localhost:8080',
    __timeout__: 0,

    create(nickname, age, email, password) { // my way
        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x >= 13))
        ow(email, ow.string.is(x => re.test(String(x))))
        ow(password, ow.string.not.empty)

        return call(`${this.__url__}/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, age, email, password }),
            timeout: this.__timeout__
        })
    },

    authenticate(nickOEmail, password) { // my way
        ow(nickOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return call(`${this.__url__}/api/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({nickOEmail, password }),
            timeout: this.__timeout__
        })
    },

    retrieveUser(token) { // my way
        ow(token, ow.string.not.empty)

        return call(`${this.__url__}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    },
}

export default restApi
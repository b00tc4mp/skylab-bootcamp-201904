'use strict'

const userApi = {
    // TODO

    __url__ : "https://skylabcoders.herokuapp.com/api",

    __call__(path, method, callback, body) {
        // TODO validate inputs

        const xhr = new XMLHttpRequest

        xhr.open(method, `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText))
        })

        if (method === 'GET') {
            if (body) throw Error('cannot send body in GET request')
            else xhr.send()
        } else {
            if (body) {
                xhr.setRequestHeader('content-type', 'application/json')
                xhr.send(JSON.stringify(body))
            } else xhr.send()
        }
    },

    create(name, surname, username, password, callback){

        validate.arguments([
            {name: 'name', value: name, type: 'string', notEmpty: true,  },
            {name: 'surname', value: surname, type: 'string', notEmpty: true, },
            {name: 'username', value: username, type: 'string', notEmpty: true,},
            {name: 'password', value: password, type: 'string', notEmpty: true,},
            {name: 'callback', value: callback, type: 'function', notEmpty: true, }
        ])

        validate.email(username)

        this.__call__('/user', 'POST', callback, { name, surname, username, password } )
    },

    authUser(username, password, callback){

        validate.arguments([
            {name: 'username', value: username, type: 'string', notEmpty: true,},
            {name: 'password', value: password, type: 'string', notEmpty: true,},
            {name: 'callback', value: callback, type: 'function', notEmpty: true, }
        ])

        this.__call__('/user', 'POST', callback, {username, password })
    },

    retrieveUser(token, userID, callback){

        validate.arguments([
            {name: 'token', value: token, type: 'string', notEmpty: true,},
            {name: 'userID', value: userID, type: 'string', notEmpty: true,},
            {name: 'callback', value: callback, type: 'function', notEmpty: true, }
        ])

    },

    // updateUser(token, userID, dataToModify, callback){

    // },

    // deleteUser(token, userID, email, password, callback){

    // }
}
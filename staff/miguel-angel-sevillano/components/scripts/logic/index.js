'use strict'

const logic = {
    registerUser(name, surname, email, password, callback) {
        
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { value: callback, type: 'function' }
        ])

        validate.email(email)

        userApi.create(name, surname, email, password, function(response) {
            if (response.status === 'OK') callback()
            else callback(Error(response.error))
        })
    },

    loginUser(email, password,callback) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { value: callback, type: 'function' }            
        ])

        validate.email(email)

        userApi.authenticate(email, password, function(response) {
            if (response.status === 'OK') {  
                sessionStorage.setItem('token',response.data.token)
                sessionStorage.setItem('id',response.data.id) 
                callback()
            }

            else callback(Error(response.error))
        })
    
    },


    searchDucks(query, callback) {
       
        if(callback === undefined)return TypeError(`${callback} its not a callback`)

        duckApi.searchDucks(query, callback)
    },

    retrieveDuck(id, callback) {
        if(callback === undefined)return TypeError(`${callback} its not a callback`)
        if(id.length <0)return TypeError(`${id} id needed`)
        duckApi.retrieveDuck(id, callback)
    }
}

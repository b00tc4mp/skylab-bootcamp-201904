
var logic = {

    registerUser(name, surname, email, password, confirmPassword, callback ) {
        let error

        validate.arguments([
            {name: 'name', value: name, type: 'string', notEmpty: true},
            {name: 'surname', value: surname, type: 'string', notEmpty: true},
            {name: 'email', value: email, type: 'string', notEmpty: true},
            {name: 'password', value: password, type: 'string', notEmpty: true},
            {value: confirmPassword, type: 'string', notEmpty: true},
            {value: callback, type: 'function', notEmpty: true}
        ])

        if (password !== confirmPassword) {
            error = TypeError('Passwords do not match')
            error.code = 6

            throw error
        };

        validate.email(email)

        userApi.create(name, surname, email, password, function(response) {
            if (response.status === 'OK') callback()
            else callback(Error(response.error))
        })
    },

    login(email, password, callback) {

        validate.email(email)

        validate.arguments([
            {name: 'password', value: password, type: 'string', notEmpty: true}
        ])

        userApi.authUser(email, password, function(response) {
            if (response.status === 'OK') callback(response)
            else callback(Error(response.error))
        })
    },

    retrieveUser(callback) {

        userApi.retrieveUser(__token__, __id__, function(response) {
            if (response.status === 'OK') callback(response)
            else callback(Error(response.error))
        })
    },    
    
    logOut() {
        
        this.__id__ = ""
        this.__token__ = ""
    },

    // searchDucks(quary, callback) {
    //     let error

    //     if (quary === undefined){
    //         error = TypeError('Search can not be undefined')

    //         error.code = 8
            
    //         throw error 
    //     }

    //     if (callback instanceof Function === false){
    //         error = TypeError('Callback is not a function')

    //         error.code = 9
            
    //         throw error
    //     };

    //     duckApi.searchDucks(query, callback)

    // },

    // retrieveDucklingDetail(id, callback) {
    //     let error

    //     if (id === undefined){
    //         error = TypeError('Not a valid ID')

    //         error.code = 8
            
    //         throw error
    //     }
        
    //     if (callback instanceof Function === false){
    //         error = TypeError('Callback is not a function')

    //         error.code = 9
            
    //         throw error
    //     }

    //     duckApi.retrieveDuck(id, callback)
    // }

}
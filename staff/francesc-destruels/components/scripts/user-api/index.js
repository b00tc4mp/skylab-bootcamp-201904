'use strict'

const userApi = {
    // TODO

    __url__ : "https://skylabcoders.herokuapp.com/api",

    __call__(path, method, body, callback){
        const xhr = new XMLHttpRequest()
        xhr.open(method, `${__url__}${path}`)

        if(method == 'GET') {
            if (body !== undefined || body === ""){

            } else {
                xhr.send() 
            }    
        } else {
            if (body === undefined){

            } else {
                            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
            xhr.send(JSON.stringify(body));
            }
        }
    },

    registerUser(name, surname, email, password, callback){
        let error

        if (name === undefined || name === "") {
            error = TypeError(name + ' is not a valid name');
            error.code = 2

            throw error
        };

        if (surname === undefined | surname === ""){
            error = TypeError(surname + ' is not a valid surname');
            error.code = 3

            throw error
        };

        if (email === undefined){
            error = TypeError( email + ' is not a valid e-mail');
            error.code = 4

            throw error
        };

        if (password === undefined && password.length < 5){
            error = TypeError('Password has to be longer than 5 characters');
            error.code = 5

            throw error
        };

        this.__call__('/user', 'POST', {name, surname, username, password}, callback)
    },

    authUser(email, password){

    },

    retrieveUser(token, userID){

    },

    updateUser(token, userID, dataToModify){

    },

    deleteUser(token, userID, email, password){

    }
}
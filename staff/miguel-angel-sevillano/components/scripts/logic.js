'use strict';

var logic = {
    register: function (name, surname, email, password) {
        if (typeof name == 'undefined' || typeof name == 'empty') throw TypeError(name + ' is not a valid name');
        if (typeof surname == 'undefined' || typeof surname == 'empty') throw TypeError(surname + ' is not a valid name');
        if (email.indexOf("@") == -1)throw TypeError(email + ' is not a valid email');

        // TODO verify user does not exists already, otherwise error 'user already exists'

        users.forEach(element => {
            if (element.email === email){
                throw TypeError('user alredy registered');
            }
            
        });

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    },

    login: function (email, password) {
        // TODO validate input data

        var user = users.find(function(user) { return user.email === email });

        if (!user) {
            var error = Error('wrong credentials')

            error.code = 1;

            throw error;
        };

        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accessTime__ = Date.now();
        } else {
            var error = Error('wrong credentials')

            error.code = 1;

            throw error;
        };
    },

    logout:function(){

        this.__userEmail__=undefined;
        this.__accessTime__=undefined;
    },

    
    searchDucks: function (query, callback) {
        // TODO validate inputs

        var xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText));
        });

        xhr.send();
    },

    retrieveDucklingDetail: function(id, callback) {
        // TODO validate inputs
        
        var xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText));
        });

        xhr.send();
    },


}

'use strict';

var logic = {
    register: function (name, surname, email, password) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a valid name');
        if (typeof surname !== 'string') throw TypeError(surname + ' is not a valid surname');
        if (typeof email !== 'string') throw TypeError(email + ' is not a valid email');
        if (typeof password !== 'string') throw TypeError(password + ' is not a valid password');

        var user = users.some(function(user) { return user.email === email });
        if (user) {
            var error = Error('user already registered')

            error.code = 1;

            throw error;
        };

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    },

    login: function (email, password) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a valid email');
        if (typeof password !== 'string') throw TypeError(password + ' is not a valid password');

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
    logout: function(){
        this.__userEmail__=null;
        this.__accessTime__=null; 

    }
}

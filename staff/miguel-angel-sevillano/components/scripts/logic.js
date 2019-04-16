'use strict';

var logic = {
    register: function (name, surname, email, password) {
        if (typeof name !== 'string') throw TypeError(name + ' is not a valid name');
        if (typeof surname !== 'string') throw TypeError(surname +' is not a valid surname')
        if ( email.indexOf("@") =-1) throw TypeError(email +' is not a valid email')
        
        var check = users.find(function(check) {return check.email = email} );
        if(check === true)throw TypeError(email + ' alredy registered')

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password
        });
    },

    login: function (email, password) {
        if ( email.indexOf("@") =-1) throw TypeError(email +' is not a valid email');

        var userMail = users.find(function(userMail) { return userMail.email === email });
        var userPass = users.find(function(userPass) { return userPass.password === password });

        if(userMail !== true)throw TypeError( ' wrong credentials')
        if(userPass !== true)throw TypeError( ' wrong credentials')
        

        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accessTime__ = Date.now();
        } 
    }
}

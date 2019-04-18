
var logic = {
    register: function(name, surname, email, password, confirmPassword) {
        var error;

        if (name === undefined || name === "") {
            error = TypeError(name + ' is not a valid name');
            error.code = 2;

            throw error;
        };

        if (surname === undefined | surname === ""){
            error = TypeError(surname + ' is not a valid surname');
            error.code = 3;

            throw error;
        };

        if (email === undefined || email.includes('@') === false){
            error = TypeError( email + ' is not a valid e-mail');
            error.code = 4;

            throw error;
        };

        if (password.length < 5){
            error = TypeError('Password has to be longer than 5 characters');
            error.code = 5;

            throw error;
        };

        if (password !== confirmPassword) {
            error = TypeError('Passwords do not match');
            error.code = 6;

            throw error;
        };

        var user = users.find(function (user) { return user.email === email }); 

        if (user !== undefined){
            error = TypeError('User already exist');
            error.code = 7;

            throw error;
        }

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password,
        });
    },

    login: function (email, password) {
        var error;
        var user = users.find(function (user) { return user.email === email }); 

        if (!user) {
            error = Error('wrong credentials');

            error.code = 1;

            throw error;
        };
        
        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accessTime__ = Date.now();
        } else {
            error = Error('wrong credentials');

            error.code = 1;

            throw error;
        };
    },

    logOut: function () {
        
        this.__accessTime__ = "";
        this.__userEmail__ = "";
    },

    // retrieveUser: function (email) {
    //     if (email === undefined) throw TypeError(`not a valid email`);

    //     var user = users.find(function (user) { return user.email === email });

    //     if (!user) {
    //         var error = Error('user not found with email ' + email)

    //         error.code = 2;

    //         throw error;
    //     }

    //     return {
    //         name: user.name,
    //         surname: user.surname,
    //         email: user.email
    //     };
    // },

    searchDucks: function (quary, callback) {
        var error;

        if (quary === undefined){
            error = TypeError('Search can not be undefined');

            error.code = 8;
            
            throw error; 
        };

        if (callback instanceof Function === false){
            error = TypeError('Callback is not a function');

            error.code = 9;
            
            throw error; 
        };

        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + quary);

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText));
        });

        xhr.send();

    },

    retrieveDucklingDetail: function (id, callback) {
        var error;

        if (id === undefined){
            error = TypeError('Not a valid ID');

            error.code = 8;
            
            throw error; 
        };
        
        if (callback instanceof Function === false){
            error = TypeError('Callback is not a function');

            error.code = 9;
            
            throw error; 
        };

        var xhr = new XMLHttpRequest;

        xhr.open('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id);

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText));
        });

        xhr.send();
    }

}






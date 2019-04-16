
var logic = {
    register: function(name, surname, email, password, confirmPassword) {
        var error;

        if (typeof name !== 'string' || name === undefined || name === "") {
            error = TypeError(name + ' is not a valid name');
            error.code = 2;

            throw error;
        };

        if (typeof surname !== 'string'|| surname === undefined | surname === ""){
            error = TypeError(surname + ' is not a valid surname');
            error.code = 3;

            throw error;
        };

        if (email === undefined || email.includes('@') === false){
            error = TypeError( email + ' is not a valid e-mail');
            error.code = 4;

            throw error;
        };

        if (password.length < 2){
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
}






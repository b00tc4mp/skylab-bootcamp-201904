
var logic = {
    register: function(name, surname, email, password, confirmPassword) {
        if (typeof name !== 'string' || name === undefined || name === "") throw new TypeError(name + ' is not a valid name');
        if (typeof surname !== 'string'|| surname === undefined | surname === "") throw new TypeError(surname + ' is not a valid surname');
        if (email === undefined || email.includes('@') === false) throw new TypeError( email + ' is not a valid e-mail');
        if (password.length < 6) throw new TypeError('Password has to be longer than 5 characters');
        if (password !== confirmPassword) throw new TypeError('Passwords do not match');

        users.push({
            name: name,
            surname: surname,
            email: email,
            password: password,
        });
    },

    login: function(email, password) {
        if (email === undefined || email.includes('@') === false) throw new TypeError( email + ' is not a valid e-mail');
        if (password.length < 6) throw new TypeError('Password has to be longer than 5 characters');
        
        var user = users.find(function (user) { return user.email === email });

        if(!user){
            var error = Error('wrong credential');
                
        }

        if (user.password === password) {
            this.__userEmail__ = email;
            this.__accestime__ = Date.now();
        } else {
            throw new TypeError('wrong credentials');
        }
    },
}






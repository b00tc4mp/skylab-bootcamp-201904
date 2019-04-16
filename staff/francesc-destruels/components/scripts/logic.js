

function register(name, surname, email, password) {

    //Comprovar si el usuario existe
    users.push({
        name: name,
        surname: surname,
        email: email,
        password: password,
    });
};

function login(email, password) {

    var user =  users.find(function(user){return user.email === email});

    //USUARIO ENCONTRADO

    if (user.password === password){
        this.__userEmail__ = email;
        this.__accestime__ = date.now();
    } else {
        //crear el error
        //throw Error 'wrong credentials'
    }

};


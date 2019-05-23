const mongoose = require('mongoose'); 
const User = require('./schema/user')

// npm promps
mongoose.connect('mongodb://localhost/test', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

(async() =>{

   const user= await User.create ({  
        firstName: 'hola',
        lastName: 'Lannister',
        email: 'jamie7@gmail.com',
        password: '123'
    })

    console.log(user)


})()

User.find({
    firstname: hola 
}).exec(function(err, books) {
    if (err) throw err;
     
    console.log(books);
});
const validate = {
    arguments(args){
        args.forEach(({name, value, type, notEmpty, optional}) => {
            if (typeof value !== type) throw TypeError(`${value} is not a ${type}`)  
            if (notEmpty) if (type === 'string') if (!value.trim().length) throw Error(`${name} can not be empty`) 
        });
    },

    email(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
       if (!re.test(String(email).toLowerCase())) throw new FormatError(`${email} is not a valid e-mail`)
    },
}
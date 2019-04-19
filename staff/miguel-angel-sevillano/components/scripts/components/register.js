'use strict';

/**
 * Register form.
 * 
 * @param {*} form 
 * @param {Funcion} onRegister The callback invoked on register.
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {*} onLanguageChange The callback invoked on language change.
 */


class Register extends Component {
    constructor(form,onRegister,literals,onLanguageChange){
        super(form)
        this.container = form;
        this.__literals__ = literals;
        this.onRegister = onRegister;
        this.language= onLanguageChange
            
    }

    set onRegister(callback){
        this.container.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = this.name.value;
            var surname = this.surname.value; //seter that is activated when click register button
            var email = this.email.value;
            var password = this.password.value;

            callback(name, surname, email, password);
        });

    }
    set language(language){
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;
        this.container.name.placeholder = literals.name;        //changes the language when language button is changed
        this.container.surname.placeholder = literals.surname;
        this.container.email.placeholder = literals.email;
        this.container.password.placeholder = literals.password;

        this.container.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);

    }
}



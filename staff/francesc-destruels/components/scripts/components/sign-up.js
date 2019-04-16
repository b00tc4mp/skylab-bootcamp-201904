'use strict';


/**
 * 
 * @param {*} form 
 * @param {*} callback 
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {*} onLanguageChange 
 */

function SignUp(form, onSignUp, literals, defaultLanguage, onLanguageChange) {
    Component.call(this, form);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    this.language = defaultLanguage;

    this.onSignUp = onSignUp;
}

SignUp.prototype = Object.create(Component.prototype);
SignUp.prototype.constructor = SignUp;

Object.defineProperty(SignUp.prototype, "onSignUp", { 
    set: function(callback) {
        this.container.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = this.name.value;
            var surname = this.surname.value;
            var email = this.email.value;
            var password = this.password.value;
            var confirmPassword = this.confirmpassword.value;

            callback(name, surname, email, password, confirmPassword);
        });
    }
});

Object.defineProperty(SignUp.prototype, 'language', {
    set: function(language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;
        this.container.name.placeholder = literals.name;
        this.container.surname.placeholder = literals.surname;
        this.container.email.placeholder = literals.email;
        this.container.password.placeholder = literals.password;
        this.container.confirmpassword.placeholder = literals.confirmpassword;

        this.container.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }
});


'use strict';

/**
 * 
 * @param {*} form 
 * @param {*} callback 
 * @param {*} literals 
 * @param {*} defaultLanguage 
 * @param {*} onLanguageChange 
 */

function SignIn(form, onSignIn, literals, defaultLanguage, onLanguageChange) {
    Component.call(this, form);

    this.__literals__ = literals;
    this.__onLanguageChange__ = onLanguageChange;

    var feedback = new Feedback(this.container.children[3]);

    this.__feedback__ = feedback;

    feedback.visibility = false;

    this.language = defaultLanguage;

    this.onSignIn = onSignIn;
}

SignIn.prototype = Object.create(Component.prototype);
SignIn.prototype.constructor = SignIn;

Object.defineProperty(SignIn.prototype, "onSignIn", {
    set: function (callback) {
        this.container.addEventListener('submit', function (event) {
            event.preventDefault();

            var email = this.email.value;
            var password = this.password.value;

            callback(email, password);
        });
    }
});

Object.defineProperty(SignIn.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;

        this.container.email.placeholder = literals.email;
        this.container.password.placeholder = literals.password;

        this.container.children[2].innerText = literals.title;

        if (this.__onLanguageChange__) this.__onLanguageChange__(language);
    }
});

Object.defineProperty(SignIn.prototype, 'error', {
    set: function (error) {
        this.__feedback__.message = error;
        this.__feedback__.visibility = true;
    }
});

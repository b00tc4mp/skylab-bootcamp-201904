'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var langSelector = new LanguageSelector(select, function (lang) {
    signUp.language = lang;
    signIn.language = lang;

});

var forms = document.getElementsByTagName('form');

var signUp = new SignUp(forms[0], function(name, surname, email, password){
    register(name, surname, email, password);
    signUp.visible = false;
    signUpOk.visible = true;

}, i18n.signUp, defaultLanguage);

var signIn = new SignIn(forms[1], login, i18n.signIn, defaultLanguage);
signIn.visible = false;

var sections = Document.getElementsByTagName('section');
var signUpOk = new SignInOk(sections[0], function(){
    signUpOk.visible = false;
    signIn.visible = true;
});
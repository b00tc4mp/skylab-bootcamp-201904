'use strict';

var languageSelected = 'en';

// ELEMENTOS EXTRAIDOS DE DOCUMENT
var select = document.getElementsByTagName('select')[0];
var forms = document.getElementsByTagName('form');
var sections = document.getElementsByTagName('section');
var main = document.getElementsByTagName('main')[0];


var landing = new Landing(sections[0], i18n.landing, function(){
    landing.visible = false;
    signUp.visible = true;
},  function(){
    landing.visible = false;
    signIn.visible = true;
});

// SELECTOR DE IDIOMAS SCRIPTNAME LANGUAGE-SELECTOR
var languageSelector = new LanguageSelector(select, function (language) {
    languageSelected = language;
    signUp.language = language;
    signIn.language = language;
    landing.language = language;
});

// SIGN UP SCRIPT CREATOR COMPONENT NAME SIGN-UP
var signUp = new SignUp(forms[0], function(name, surname, email, password, confirmPassword){
    logic.register(name, surname, email, password, confirmPassword);

    signUp.visible = false;
    signUpOk.visible = true;
}, i18n.signUp, defaultLanguage);

// SIGN UP CONFIRMAtION SCRIPT CREATOR COMPONENT NAME SIGN-UP-OK
var signUpOk = new SignUpOk(sections[1], function(){
    signUpOk.visible = false;
    signIn.visible = true;
});

signUpOk.visible = false;


// SIGN IN SCRIPT CREATOR COMPONENT NAME SIGN-IN
var signIn = new SignIn(forms[1], function(email, password){
    try {
        logic.login(email, password);

        signIn.visible = false;
        home.visible = true;
    } catch (error) {
        login.error = i18n.errors[defaultLanguage][error.code];
    }
    
}, i18n.signIn, defaultLanguage, function(){
    this.__feedback__.visible = false;
});

signIn.visible = false;


// SIGN IN OK CONFIRMAtION SCRIPT CREATOR COMPONENT NAME SIGN-IN-OK
var home = new Home(main);

home.visible = false;

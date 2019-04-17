'use strict';

var languageSelected = 'en';

// ELEMENTOS EXTRAIDOS DE DOCUMENT
var select = document.getElementsByTagName('select')[0];
var forms = document.getElementsByTagName('form');
var sections = document.getElementsByTagName('section');
var main = document.getElementsByTagName('main')[0];

// SELECTOR DE IDIOMAS SCRIPTNAME LANGUAGE-SELECTOR
var languageSelector = new LanguageSelector(select, function (language) {
    languageSelected = language;

    landing.language = language;
    register.language = language;
    login.language = language;
    home.language = language;
});

//PRIMERA VENTANA QUE TE DEJA REGISTRARTE O INICIAR SESIÓN
var landing = new Landing(sections[0], i18n.landing, function () {
    landing.visible = false;
    register.visible = true;
}, function () {
    landing.visible = false;
    login.visible = true;
});

// SIGN UP SCRIPT CREATOR COMPONENT NAME SIGN-UP
var register = new Register(forms[0], function (name, surname, email, password, confirmPassword) {
    try {
        logic.register(name, surname, email, password, confirmPassword);

        register.visible = false;
        registerOk.visible = true;
    } catch (error) {
        register.error = i18n.errors[languageSelected][error.code];
    }

}, i18n.register, languageSelected, function () {
    this.__feedback__.visible = false;
});

register.visible = false;

// SIGN UP CONFIRMAtION SCRIPT CREATOR COMPONENT NAME SIGN-UP-OK
var registerOk = new RegisterOk(sections[1], function () {
    registerOk.visible = false;
    login.visible = true;
});

registerOk.visible = false;


// SIGN IN SCRIPT CREATOR COMPONENT NAME SIGN-IN
var login = new Login(forms[1], function (email, password) {
    try {
        logic.login(email, password);

        login.visible = false;
        home.visible = true;
    } catch (error) {
        login.error = i18n.errors[languageSelected][error.code];
    }

}, i18n.login, languageSelected, function () {
    this.__feedback__.visible = false;
});

login.visible = false;

//CREADOR DEL HOME;

var home = new Home(main, function () {
    logic.logOut();

    home.visible = false;
    landing.visible = true;

}, function (query) {
    logic.searchDucks(query, function (ducks) {
        home.results = ducks.map(function (duck) {
            return {
                id: duck.id,
                title: duck.title,
                image: duck.imageUrl,
                price: duck.price
            }
        });
    });
}, function (id) {
    logic.retrieveDucklingDetail(id, function (ducks) {

        home.detail = {
                // id: duck.id,
                title: ducks.title,
                image: ducks.imageUrl,
                price: ducks.price,
                description: ducks.description,
                // link: duck.link,
        };
    });
}, i18n.home, languageSelected);

home.visible = false;

'use strict';

// presentation logic
var defaultLanguage = 'en';

var select = document.getElementsByTagName('select')[0];
var langSelector = new LanguageSelector(select, function (lang) {
    signIn.language = lang;
    signInAdmin.language = lang;
    signInSuperAdmin.language = lang;
});


var forms = document.getElementsByTagName('form');

var signIn = new SignIn(forms[1], singInBasic, i18n.signIn, defaultLanguage);

var signInAdmin = new SignIn(forms[2], singInAdmin, i18n.signIn, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' ' + admin;
});

var signInSuperAdmin = new SignIn(forms[3], singInSuperAdmin, i18n.signIn, defaultLanguage, function (language) {
    var admin = i18n.admin[language];

    this.__form__.children[0].innerText += ' Super ' + admin;
});


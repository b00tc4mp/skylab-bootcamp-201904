'use strict';

let languageSelected = 'en';

let select = document.getElementsByTagName('select')[0];

let languageSelector = new LanguageSelector(select, function (language) {
    languageSelected = language; //language setter of each propiety
    landing.language = language;
    register.language = language;
    login.language = language;
});


// END LANGUAGE SELECTOR--------------------------------------------------------------------------------

var sections = document.getElementsByTagName('section');

var landing = new Landing(sections[0], i18n.landing, function() {
    landing.visible = false; //navigate to register
    register.visible = true;
}, function() {
    landing.visible = false;//navigate to login
    login.visible = true;
},languageSelected);
landing.visible = false;


// END LANDING-------------------------------------------------------------------------------------

var forms = document.getElementsByTagName('form');

var register = new Register(forms[0], function (name, surname, email, password) {
    logic.register(name, surname, email, password); //sends to logic the data from the setter when button register is clicked

    register.visible = false; // turns on of visibility when setter is activated
    registerOk.visible = true;
}, i18n.register, languageSelected);
    register.visible = false;


//REGISTER ENDS HERE----------------------------------------------------------------------

var login = new Login(forms[1], function (email, password) {
    try {
        logic.login(email, password); //sends info to logic , after setter activate onclick login

        login.visible = false;
        home.visible = true;
    } catch (error) {
        login.error = i18n.errors[languageSelected][error.code];
    }
}, i18n.login, languageSelected, function() {
    this.__feedback__.visible = false;
});


login.visible = false;


//LOGIN ENDS HERE-------------------------------------------------------------------

var registerOk = new RegisterOk(sections[1], function () {
    registerOk.visible = false;
    login.visible = true;
});
registerOk.visible = false;


// REGISTER ENDS HERE-------------------------------------------------------

var main = document.getElementsByTagName('main')[0];

var home = new Home(main, function(query) {
    logic.searchDucks(query, function(ducks) { //calls logic for info
        home.results = ducks.map(function(duck) { //format resuults of duck info
            return {
                id: duck.id,
                title: duck.title,
                image: duck.imageUrl, 
                price: duck.price,
            }
        });
    });
    
},function(){
    logic.logout();
    landing.visible=true;
    home.visible=false; // reset the sesion of the logged user

},function (id){
    logic.retrieveDucklingDetail(id,function(ducks){ //calls loic for duck detail by id
        
        home.detail= {

            title: ducks.title,
            image: ducks.imageUrl,
            price: ducks.price,
            description : ducks.description,

        };
    });
});
home.visible = false;
landing.visible=true;


//HOME ENDS HERE----------------------------------------------------------------------
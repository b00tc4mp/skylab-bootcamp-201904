'use strict'

let languageSelected = 'en'

const select = document.getElementsByTagName('select')[0]
const languageSelector = new LanguageSelector(select, function (language) {
    languageSelected = language

    landing.language = language
    register.language = language
    login.language = language
    home.language = language
})

const sections = document.getElementsByTagName('section')

const landing = new Landing(sections[0], i18n.landing, function() {
    landing.visible = false
    register.visible = true
}, function() {
    landing.visible = false
    login.visible = true
})


const forms = document.getElementsByTagName('form')

const register = new Register(forms[0], function (name, surname, email, password) {
    logic.registerUser(name, surname, email, password, function(error) {
        if (error) return alert(error.message)
        document.getElementsByClassName("title")[0].style.display ="none";
        register.visible = false
        registerOk.visible = true
     
    })
}, i18n.register, languageSelected)

register.visible = false




const login = new Login(forms[1], function (email, password) {
    
        logic.loginUser(email, password, function(error){
            if (error) return alert(error.message)

            userApi.retrieve(sessionStorage.getItem('id'),sessionStorage.getItem('token'),function (response2){
            home.name = response2.data.name;//obtains data from token user and shows name
            document.getElementsByClassName("title")[0].style.display ="none";
            login.visible = false
            home.visible = true

        })
    })
        
        
    
}, i18n.login, languageSelected, function() {
    this.__feedback__.visible = false
})
login.visible = false


const registerOk = new RegisterOk(sections[1], function () {
    registerOk.visible = false
    login.visible = true
})
registerOk.visible = false

const main = document.getElementsByTagName('main')[0]

const home = new Home(main, function(query) {
    logic.searchDucks(query, function(ducks) {
        home.results = ducks.map(function(duck) {
            return {
                id: duck.id,
                title: duck.title,
                image: duck.imageUrl,
                price: duck.price
            }
        })
    })
}, function(duckId) {
    logic.retrieveDuck(duckId, function(duck) {
        home.detail = {
            title: duck.title,
            image: duck.imageUrl,
            price: duck.price,
            description: duck.description
        }
    })
},function(){
    document.getElementsByClassName("title")[0].style.display ="block"
    landing.visible =true;
    home.visible = false;
},i18n.home)
home.visible = false



'use stric'

function Home(container, onLogOut, onSearch, onDetail, literals, defaultLanguage){
    Component.call(this, container);


    // ARGUMENT 1 FUNCION LOOGOUT LLAMADA A LOGICA 1
    this.onLogOut = onLogOut; 

    //ARGUMENT 2 FORM DEL SEARCH LLAMADA A LOGICA 2
    var form = this.container.children[2];
    new Search(form, onSearch);

    // CONTIENE EL RESULTADO DE LA BUSQUEDA 
    var ul = this.container.children[3];

    var results = new Results(ul, onDetail);
    results.visible = false;

    this.__results__ = results;

    //ARGUMENT 3 CONTENDRA EL RESULTADO DEL DETAIL LLAMADA A LOGICA 3
    var article = this.container.children[4];

    var detail = new Detail(article);
    detail.visible = false;

    this.__detail__ = detail;

    //ARGUMENT 4 y 5 FIJAR IDIOMA
    this.__literals__ = literals;
    this.language = defaultLanguage;
};

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

// SETTER PARA CUANDO SE ACTIVA EL CLICK EN EL BOTON DE LOGOUT
Object.defineProperty(Home.prototype, "onLogOut", {
    set: function (callback) {
        this.container.children[1].addEventListener('click', function (event) {
            event.preventDefault();

            callback();
        });
    }
});

// SETTER PARA CUANDO RESULTS SE MODIFICA DESPIERTA EL UL;
Object.defineProperty(Home.prototype, "results", {
    set: function (results) {

        this.__results__.items = results;
        this.__results__.visible = true;
        this.__detail__.visible = false;

    }
});

//SETTER PARA DESPERTAR A ARTICLE Y DORMIR RESULTS

Object.defineProperty(Home.prototype, "detail", {
    set: function (detail) {

        this.__detail__.items = detail;
        this.__results__.visible = false;
        this.__detail__.visible = true;

    }
});

// SETTER PARA EL IDIOMA

Object.defineProperty(Home.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;
        this.container.children[1].innerText = literals.logOut;
    }
});

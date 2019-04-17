'use stric'

function Home(container, onLogOut, literals, defaultLanguage){
    Component.call(this, container);
    
    this.__literals__ = literals;
    this.language = defaultLanguage;

    var form = this.container.children[2];

    var search = new Search(form, onSearch);

    var form = this.container.children[3];

    var results = new Result(container, );

    this.__results__ = results;

    this.onLogOut = onLogOut;
};

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Object.defineProperty(Home.prototype, "onLogOut", {
    set: function (callback) {
        this.container.addEventListener('click', function (event) {
            event.preventDefault();


            callback();
        });
    }
});

Object.defineProperty(Home.prototype, "results", {
    set: function (results) {
        this.__results__.items = results;

            callback();
    }
});

Object.defineProperty(Home.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;
        this.container.children[1].innerText = literals.logOut;
    }
});

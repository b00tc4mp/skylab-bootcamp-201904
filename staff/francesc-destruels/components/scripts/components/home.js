'use stric'

function Home(container, onLogOut, literals, defaultLanguage){
    Component.call(this, container);
    
    this.__literals__ = literals;
    this.language = defaultLanguage;


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

Object.defineProperty(Home.prototype, 'language', {
    set: function (language) {
        var literals = this.__literals__[language];

        this.container.children[0].innerText = literals.title;
        this.container.children[1].innerText = literals.logOut;
    }
});

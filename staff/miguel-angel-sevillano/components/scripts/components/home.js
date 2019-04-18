'use strict';

function Home(container, onSearch,logout,onDetail) {
    Component.call(this, container);

    var form = this.container.children[2];
    new Search(form, onSearch);

    var ul = this.container.children[3];
    var results = new Results(ul,onDetail);
    this.__results__ = results;

    var links=this.container.children[1];

    links.addEventListener('click', function(event) {
        event.preventDefault();
        
        logout();
    });

}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

Object.defineProperty(Home.prototype, 'results', {
    set: function(results) {
        this.__results__.items = results;
    }
})
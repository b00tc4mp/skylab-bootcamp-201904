'use strict';

function Home(container,gotolanding) {
    Component.call(this, container);

    var links=this.container.children;

    links[1].addEventListener('click', function(event) {
        event.preventDefault();
        
        gotolanding();
    });
}

Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;
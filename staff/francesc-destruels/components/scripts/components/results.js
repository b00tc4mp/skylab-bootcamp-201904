'use strict'

function Results(ul){
    Component.call(this, ul);

}

Results.prototype = Object.create(Component.prototype);
Results.prototype.constructo = Results;

Object.defineProperty(Results.prototype, "items", {
    set: function(items){
        items.forEach(function(item){
            var li = document.createElement('li');

            li.setAttribute('data-id'); 

            var h3 = document.createElement('h3');
            h3.innerText = item.tittle;
            li.appendChild(h3);

            var img = document.createElement('img');
            img.src = item.image;
            li.appendChild(img);

            var span = document.createElement('span');
            span.innerText = item.price;
            li.appendChild(span);

            this.container.appendChild(li);
        }.bind(this));
    }
})
'use stric'

function Detail(container) {
    Component.call(this, container);
}

Detail.prototype = Object.create(Component.prototype);
Detail.prototype.constructor = Detail;

Object.defineProperty(Detail.prototype, "item", {
    set: function(items){
        while (this.container.firstElementChild) this.container.removeChild(this.container.firstElementChild);
            var h3 = document.createElement('h3');
            h3.innerText = items.title;

            var img = document.createElement('img');
            img.src = items.image;

            var p = document.createElement('p');
            p.innerText = items.description;

            var span = document.createElement('span');
            span.innerText = items.price;

            this.container.appendChild(h3);
            this.container.appendChild(img);
            this.container.appendChild(p);
            this.container.appendChild(span);
    }
})
'use strict'

function Results(ul, onDetail){
    Component.call(this, ul);

    this.onDetail = onDetail;
}

Results.prototype = Object.create(Component.prototype);
Results.prototype.constructo = Results;


//UN SETTER PARA CUANDO CAMBIA ITEMS; LO CONVIERTE EN ELEMENTOS HTML 
Object.defineProperty(Results.prototype, "items", {
    set: function(items){
        items.forEach(function(item){

            var li = document.createElement('li');

            li.setAttribute('data-id', item.id); 

            var h3 = document.createElement('h3');
            h3.innerText = item.title;
            li.appendChild(h3);

            var img = document.createElement('img');
            img.src = item.image;
            li.appendChild(img);

            var span = document.createElement('span');
            span.innerText = item.price;
            li.appendChild(span);

            this.container.appendChild(li);            
            
            li.addEventListener('click', function () {
                this.visible = false;
                this.onDetail(item.id);
                
            }.bind(this));
        }.bind(this));
    }
})
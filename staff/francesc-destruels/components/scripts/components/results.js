'use strict'

class Results extends Component {
    constructor(ul, onDetail){
        super(ul)

        this.onDetail = onDetail
    }
}

//UN SETTER PARA CUANDO CAMBIA ITEMS; LO CONVIERTE EN ELEMENTOS HTML 
Object.defineProperty(Results.prototype, "items", {
    set: function(items){
        while (this.container.firstElementChild) this.container.removeChild(this.container.firstElementChild)
        items.forEach(function(item){

            var li = document.createElement('li')

            var h2 = document.createElement('h2')
            h2.innerText = item.title
            li.appendChild(h2)

            var img = document.createElement('img')
            img.src = item.image
            li.appendChild(img)

            var span = document.createElement('span');
            span.innerText = item.price;
            li.appendChild(span)

            this.container.appendChild(li)         
            
            li.addEventListener('click', function () {
                // this.visible = false
                this.onDetail(item.id)
            }.bind(this))
        }.bind(this))
    }
})
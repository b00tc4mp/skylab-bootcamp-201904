'use strict'



class Detail extends Component{
    constructor(section){
        super(section)
        
        this.container = section;
        

    }
    set items(item){
        debugger
        var h2= this.container.children[0];
        h2.innerText =item.title;

        var img = this.container.children[1];
        img.src = item.image;

        var span = this.container.children[2];
        span.innerText = item.price;

        var p = this.container.children[3];
        p.innerText = item.description;

    }
}






'use strict';


class Feedback extends Component{
    constructor(container){
        super(container)
        this.container = container;
        
    }
    set message(message){
        this.container.innerText = message;
    }
}

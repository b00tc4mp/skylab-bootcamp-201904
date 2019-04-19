'use strict';




class Component{
    constructor(container){
        this.container = container;
    }

    set visible(visible){
        this.container.style.display = visible ? 'block' : 'none';//adds the property of  make visible or not
    }
}


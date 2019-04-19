'use strict';



class Home extends Component{
    constructor(container,onSearch,logout,onDetail){
        super(container)
        this.container = container
        var form = this.container.children[2];
        var ul = this.container.children[3]; 
        var links = this.container.children[1]; 
        var section = this.container.children[4];
        new Search(form,onSearch)//sends info from search bar to search
        var results = new Results(ul,onDetail);
        this.__results__ = results;
        var detail = new Detail(section);
        this.__detail__ = detail;
        detail.visible = false;

        links.addEventListener('click', function(event) {
            event.preventDefault();
            
            logout();
        });


    }

    set results(results){
            
        this.__results__.items = results;

    }

    set detail(detail){
        this.__detail__.items = detail;
        this.__results__.visible = false;
        this.__detail__.visible = true;
    }
}



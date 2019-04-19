'use strict';


class Search extends Component{
    constructor(container,onSearch){
        super(container)
        this.container = container;
        this.onSearch = onSearch;
    }

    set onSearch(callback){
        this.container.addEventListener('submit', function(event) {
            event.preventDefault();

            var query = this.query.value;
            
            callback(query);
        }); 
    }
}


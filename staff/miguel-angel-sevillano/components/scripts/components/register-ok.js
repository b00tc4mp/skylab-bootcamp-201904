'use strict';


class RegisterOk extends Component{
    constructor(section,onNavigateToLogin){
        super(section)
        this.container = section;
        var link = this.container.children[0]
        link.addEventListener('click', function(event) {
            event.preventDefault();
    
            onNavigateToLogin();
        });
        
    }
}


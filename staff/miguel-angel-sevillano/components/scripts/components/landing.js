'use strict';

class Landing extends Component{
    constructor(section, literals, onNavigateToRegister, onNavigateToLogin,languageSelected){
        super(section)
    this.section = section;
    let links = this.section.children;
    this.literals = literals;
    this.language = languageSelected;
        
    links[0].addEventListener('click', function(event) {
        event.preventDefault();

        onNavigateToRegister();
    });

    links[2].addEventListener('click', function(event) {
        event.preventDefault();

        onNavigateToLogin();
    });
    
    }
    set language(change){

            var literals = this.literals[change];//this language comes from the new landing and laguange selector
    
            var children = this.section.children;
            children[0].innerText = literals.register;
            children[1].innerText = literals.or;
            children[2].innerText = literals.login;
        }
    
}






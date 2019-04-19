'use strict';

/**
 * 
 * @param {HTMLElement} select 
 * @param {Function} callback 
 */


class LanguageSelector extends Component{

    constructor(select, callback) {
        super(select) // extends with component to been able to be visible or not
        this.select = select;
        this.onChange= callback;
    }
    
    set onChange(result){

        this.select.addEventListener('change',function(event){
            
            result(event.target.value) // cat , en ,es etc from language button
        })
    }

}

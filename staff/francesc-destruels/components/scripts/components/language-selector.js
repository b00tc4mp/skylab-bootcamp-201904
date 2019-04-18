'use strict';

class LanguageSelector extends Component {
    constructor(select, callback){
        super(select)

        this.onChange = callback
    }
}

Object.defineProperty(LanguageSelector.prototype, "onChange", {
    set: function (callback) {
        this.container.addEventListener('change', function (event) {
            callback(event.target.value)
        });
    }
});
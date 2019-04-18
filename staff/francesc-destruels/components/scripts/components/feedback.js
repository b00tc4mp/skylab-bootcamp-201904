'use strict'

class Feedback extends Component {
    constructor(container){
        super(container)
    }
}

Object.defineProperty(Feedback.prototype, 'message', {
    set: function(message){
        this.container.innerText = message
    }
})
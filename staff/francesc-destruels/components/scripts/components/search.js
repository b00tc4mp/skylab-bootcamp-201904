'use strict'

class Search extends Component {
    constructor(container, onSearch){
        super(container)

        this.onSearch = onSearch
    }
}

Object.defineProperty(Search.prototype, "onSearch", {
    set: function(callback) {
        this.container.addEventListener('submit', function(event) {
            event.preventDefault()

            const query = this.query.value

            callback(query)
        })
    }
})
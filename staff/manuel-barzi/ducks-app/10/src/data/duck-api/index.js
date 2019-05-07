import validate from '../../common/validate'
import call from '../../common/call'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    searchDucks(query) {
        validate.arguments([
            { name: 'query', value: query, type: 'string' }
        ])
        
        return call(`${this.__url__}/search?q=${query}`)
            .then(response => response.json())
    },

    retrieveDuck(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string' }
        ])

        return call(`${this.__url__}/ducks/${id}`)
            .then(response => response.json())
    }
}

export default duckApi
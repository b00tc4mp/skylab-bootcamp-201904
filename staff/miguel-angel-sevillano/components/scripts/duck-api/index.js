'use strict'

const duckApi = {
    __url__: 'https://duckling-api.herokuapp.com/api',

    __call__(path, callback) {


        if(typeof path != 'string') return TypeError (`${path} is not a string` )
        if(typeof callback != 'function') return TypeError(`${callback} its not a function`)

        const xhr = new XMLHttpRequest

        xhr.open('GET', `${this.__url__}/${path}`)

        xhr.addEventListener('load', function () {
            callback(JSON.parse(this.responseText))
        })

        xhr.send()
    },

    searchDucks(query, callback) {
       
        if(typeof callback != 'function') return TypeError(`${callback} its not a function`)

        this.__call__(`search?q=${query}`, callback)
    },

    retrieveDuck(id, callback) {
        
        if(typeof id == 'undefined') return callback('id needed')
        if(typeof callback != 'function') return TypeError(`${callback} its not a function`)

        this.__call__(`ducks/${id}`, callback)
    }
}
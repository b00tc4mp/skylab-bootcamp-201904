
import freendiesApi from '../api'

const logic = {

    __userApiToken__: null,

    async setUserApiToken(token) {
        this.__userApiToken__ = token
        await sessionStorage.setItem('freendies-user-token', token)
        return this.__userApiToken__
    },
    deleteUserApiToken() {
        this.__userApiToken__ = null
        sessionStorage.removeItem('freendies-user-token')
    },

    getUserApiToken() {
        return this.__userApiToken__
    },

    get userLoggedIn() {
        return !!this.getUserApiToken()
    },

    registerUser(username, email, password, passwordConfirmation) {
        if (typeof username !== 'string') throw TypeError(`${username} is not a string`)

        if (!username.trim().length) throw Error('username cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(`${passwordConfirmation} is not a string`)

        if (!passwordConfirmation.trim().length) throw Error('password confirmation cannot be empty')

        if (password !== passwordConfirmation) throw Error('passwords do not match')

        return freendiesApi.registerUser(username, email, password, passwordConfirmation)
    },



    authenticateUser(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)

        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)

        if (!password.trim().length) throw Error('password cannot be empty')

        return freendiesApi.authenticateUser(email, password)
            .then((token) => {
                return this.setUserApiToken(token)
                    .then(token => {
                        return token
                    })
            })
    },

    retrieveUser(token) {
        let new_token = token ? token : this.getUserApiToken()
        return freendiesApi.retrieveUser(new_token)
    },

    updateUserEmail(email, token) {
        let new_token = token ? token : this.getUserApiToken()
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email cannot be empty')

        return freendiesApi.updateUserEmail(email, new_token)
    },

    logout() {
        this.deleteUserApiToken()
    },


    retrieveGameByQuery(genre, title) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')
        if (typeof title !== 'string') throw TypeError('title is not a string')
        if (!title.trim().length) throw Error('title cannot be empty')

        return freendiesApi.retrieveGameByQuery(genre, title)
    },

    retrieveGameByGenre(genre) {
        if (typeof genre !== 'string') throw TypeError('genre is not a string')
        if (!genre.trim().length) throw Error('genre cannot be empty')

        return freendiesApi.retrieveGameByGenre(genre)
    },

    retrieveGameById(id) {
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return freendiesApi.retrieveGameByID(id)
    },

    toggleFavs(token, id) {
        if (typeof token !== 'string') throw TypeError('token is not a string')
        if (!token.trim().length) throw Error('token cannot be empty')
        if (typeof id !== 'string') throw TypeError('id is not a string')
        if (!id.trim().length) throw Error('id cannot be empty')

        return freendiesApi.toggleFavs(token, id)
    },

    retrieveFavs() {
        return freendiesApi.retrieveFavs(this.__userApiToken__)
    },

    uploadGame(title, genre, description, images, gameFile) {

        // todo verification
        let new_token = this.getUserApiToken()
        if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
        if (!title.trim().length) throw Error('title cannot be empty')
        if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
        if (!genre.trim().length) throw Error('genre cannot be empty')
        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error('description cannot be empty')
        //if (typeof images !== 'array') throw TypeError(`${images} is not an array`)
        //if (!images.length) throw Error('images cannot be empty')
        // images.forEach(image => {
        //     if (typeof image !== 'string') throw TypeError('image must be a string')
        // })
        //if (typeof gameFile !== 'string') throw TypeError(`${gameFile} is not a string`)
        //if (!gameFile.trim().length) throw Error('gameFile cannot be empty')

        return freendiesApi.uploadGame(new_token, title, genre, description, images, gameFile)
    }
}

export default logic
const { ObjectId } = require('mongodb')
const { User, GameHistory, GameRecord, Results } = require('../data/models')

const logic = {
    registerUser(nickname, age, email, password) {
        // validate.arguments([
        //     { nickname: 'nickname', value: nickname, type: 'string', notEmpty: true },
        //     { name: 'age', value: age, type: 'number', notEmpty: true },
        //     { name: 'email', value: email, type: 'string', notEmpty: true },
        //     { name: 'password', value: password, type: 'string', notEmpty: true }
        // ])

        // validate.email(email)

        return (async () => {
            const usedEmail = await User.findOne({ email })
            const usedNickname = await User.findOne({ nickname })

            if (!usedEmail && !usedNickname) await User.create({ nickname, age, email, password })
            else throw new LogicError(`User with ${usedEmail ? usedNickname ? email && nickname : email : nickname} already exist`)
        })()
    },

    authenticateUser(email, password) {
        // validate.arguments([
        //     { name: 'email', value: email, type: 'string', notEmpty: true },
        //     { name: 'password', value: password, type: 'string', notEmpty: true }
        // ])

        // validate.email(email)

        return (async () => {
            const user = await User.findOne({ email, password }) // passwordHashed

            if (user) {
                const { _id: id } = user
                return id

            } else throw new LogicError(`Fields doesn't match`)
        })()
    },

    retrieveUser(_id) {
        // validate.arguments([
        //     { name: '_id', value: _id, type: 'string', notEmpty: true },
        // ])

        return (async () => {

            const response = await User.findById(ObjectId(_id))

            if (response._id.toString() === _id) {
                const { nickname, age, email } = response

                const user = { nickname, age, email }

                return user
            } else throw new LogicError("No User for that id")

        })()
    }
}

module.exports = logic
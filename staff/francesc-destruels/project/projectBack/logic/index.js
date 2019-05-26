const { ObjectId } = require('mongodb')
const { User, GameHistory, GameRecord, Results } = require('../data/models')
const ow = require('ow')
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const placeHolder = "http://www.europe-together.eu/wp-content/themes/sd/images/user-placeholder.svg"

const logic = {
    registerUser(nickname, age, email, password) {

        ow(nickname, ow.string.not.empty)
        ow(age, ow.number.is(x => x >= 13))
        ow(email, ow.string.is(x => re.test(String(x))))
        ow(password, ow.string.not.empty)

        return (async () => {
            const usedEmail = await User.findOne({ email })
            const usedNickname = await User.findOne({ nickname })

            if (!usedEmail && !usedNickname) await User.create({ nickname, age, email, password, avatarURL: placeHolder })
            else throw new LogicError(`User with ${usedEmail ? usedNickname ? email && nickname : email : nickname} already exist`)
        })()
    },

    authenticateUser(nickOEmail, password) {

        ow(nickOEmail, ow.string.not.empty)
        ow(password, ow.string.not.empty)

        return (async () => {

            let user
            if (re.test(String(nickOEmail))) { user = await User.findOne({ email: NickOEmail, password }) }
            else user = await User.findOne({nickname: NickOEmail, password})
    
            if (user) {
                const { _id: id } = user
                return id

            } else throw new LogicError(`Fields doesn't match`)

        })()
    },

    retrieveUser(_id) {
        ow(_id, ow.string.not.empty)

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
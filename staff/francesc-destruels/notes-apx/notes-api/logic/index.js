const validate = require('../common/validate')
const { LogicError } = require('../common/errors')
const { ObjectId } = require('mongodb')
const { User, Note } = require('../data/models')

const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const results = await User.findOne({ email })

            if (!results) await User.create({ name, surname, email, password })
            else throw new LogicError(`User with ${email} already exist`)
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({ email, password })

            if (user) {
                const { _id: id } = user
                return id

            } else throw new LogicError(`user with username \"${email}\" does not exist`)
        })()
    },

    retrieveUser(_id) {
        validate.arguments([
            { name: '_id', value: _id, type: 'string', notEmpty: true },
        ])

        return (async () => {

            const response = await User.findById(ObjectId(_id))

            if (response._id.toString() === _id) {
                const { name, surname, email } = response

                const user = { name, surname, email }

                return user
            } else throw new LogicError("No User for that id")

        })()
    },

    updateUser(id, data) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object' },
        ])

        if (data._id && id !== data.id) throw new ValueError('data id does not match criteria id');

        return (async () => {
            let caca = await User.findByIdAndUpdate(ObjectId(id), data, { new: true })

            return caca
        })()
    },

    addNote(id_, text, personal) {
        validate.arguments([
            { name: 'id_', value: id_, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true },
            { name: 'personal', value: personal, type: 'boolean', notEmpty: true, optional: true }
        ])

        return (async () => {
            const user = await User.findById(ObjectId(id_))

            if (user._id.toString() === id_ && personal) {
                const note = new Note({ text, author: user.id })

                user.notes.push(note)

                await user.save()
                return "all good"

            } else if (user._id.toString() === id_) {
                const note = new Note({ text, author: user.id })

                await note.save()
                return "all good"

            } else throw new LogicError(response.error)
        })()
    },

    retrieveUserNotes(_id) {
        validate.arguments([
            { name: '_id', value: _id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(ObjectId(_id))

            if (user._id.toString() === _id) {
                const { notes = [] } = user

                if (notes.length) {
                    const toSee = notes.map(({ text, date }) => { return { text, date } })

                    return toSee
                } else return notes
            }
            throw new LogicError(user.error)
        })()
    },

    retrievePublicNotes(_id) {
        validate.arguments([
            { name: '_id', value: _id, type: 'string', notEmpty: true },
        ])

        return (async () => {
            const user = await User.findById(ObjectId(_id))


            if (user._id.toString() === _id) {

                const publicNotes = await Note.find().populate('author')

                if (publicNotes.length) {

                    const toSee = publicNotes.map(({ text, date, author:cosa }) => {
                        
                        const { name, _id } = cosa

                        const authorId = _id.toString()

                        return { text, date, author: name, authorId}
                    })

                    return toSee
                } else return publicNotes
            }
            throw new LogicError(user.error)
        })()
    },
}

module.exports = logic
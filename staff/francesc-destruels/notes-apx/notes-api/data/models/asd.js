const validate = require('../../common/validate')
const { ValueError } = require('../../common/errors')
const { User, Note } = require('./models')

const userData = {

    create(user) {
        validate.arguments([
            { name: 'user', value: user, type: 'object', optional: false }
        ])

        return (async () => {
            await User.create(user)
        })()
    },

    // async listNotes() {
    //     return await User.find({})
    // },

    retrieve(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'object', notEmpty: true, optional: false }
        ])

        return (async () => {
            return await User.findOne(id)
        })()
    },

    find(criteria, especific) {
        validate.arguments([
            { name: 'especific', value: especific, type: 'boolean', notEmpty: true, optional: false }
        ])

        if (!especific) {
            return (async () => {
                const cursor = await User.find({})

                const users = []

                await cursor.forEach(user => {
                    if (criteria(user)) return users.push(user)
                })

                return users
            })()
        } else {
            return (async () => await User.findOne(criteria))()
        }
    },

    update(id, data, replace) {
        validate.arguments([
            { name: 'id', value: id, type: 'object', notEmpty: true },
            { name: 'data', value: data, type: 'object' },
            { name: 'replace', value: replace, type: 'boolean', optional: true }
        ])

        if (data._id && id !== data.id) throw new ValueError('data id does not match criteria id')

        return (async () => {

            if (replace) {
                let cosa = await User.findById(id)

                const { _id } = cosa

                cosa = { _id, __v, notes,  ...data}

                await cosa.save()

                return cosa
            } else
                return await User.findOneAndUpdate({ _id: id }, data, { new: true })
        })()
    }
}

module.exports = userData
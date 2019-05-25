const user = require('./User')
const note = require('./Note')
const mongoose = require('mongoose')

const model = mongoose.model.bind(mongoose)

module.exports = { 
    User: model('User', user),
    Note: model('Note', note)
}
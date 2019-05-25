const { Schema } = require('mongoose')
const note = require('./Note')

const user = new Schema({
    name: { type: String, required: true },
    surname: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    age: Number,
    notes: [note]
})

module.exports = user
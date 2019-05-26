const { Schema } = require('mongoose')
const gameHistory = require('./GameHistory')


const user = new Schema({
    nickname: { 
        type: String, 
        trim: true,
        required: true },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        // validate: isEmail
    },
    password: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    records: [gameHistory],
    avatarURL: String
})

module.exports = user
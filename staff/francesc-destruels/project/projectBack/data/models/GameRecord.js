const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const results = require('./Results')

const gameRecord = new Schema({
    players: [{ObjectId}], //from User Collection Only Pool
    results: [results],
    date: {
        type: Date, default: Date.now
    },
})

module.exports = gameRecord
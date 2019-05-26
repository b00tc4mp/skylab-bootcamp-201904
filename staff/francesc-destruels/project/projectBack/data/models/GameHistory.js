const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const gameHistory = new Schema({
    victory: {
        type: Boolean,
        required: true
    },
    gameId: ObjectId //from GameRecord Collection, we will get Date, Players, finalScore
})

module.exports = gameHistory
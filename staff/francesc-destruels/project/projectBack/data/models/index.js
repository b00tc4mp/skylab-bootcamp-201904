
const user = require('./User')
const gameHistory = require('./GameHistory')
const gameRecord = require('./GameRecord')
const results = require('./Results')
const mongoose = require('mongoose')

const model = mongoose.model.bind(mongoose)

module.exports = { 
    User: model('User', user),
    GameHistory: model('GameHistory', gameHistory),
    GameRecord: model('GameRecord', gameRecord),
    Results: model('Results', results)
}
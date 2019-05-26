const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')

const results = new Schema({
    player: ObjectId, //from User Collection Only Pool
    finished: Boolean,
    OneEggLvL: Number,
    twoEggLvL: Number,
    threeEggLvL: Number,
    FourEggLvL: Number,
    OneEggAmount: Number,
    twoEggAmount: Number,
    threeEggAmount: Number,
    FourEggAmount: Number,
    SecurityLvL: Number,
    SecurityPosition: Number,
    ToolsLvL: Number,
    ToolsPosition: Number, 
    finalScore: Number,
    finalPosition: Number,
})

module.exports = results
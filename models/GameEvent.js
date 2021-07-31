const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const gameEventSchema = mongoose.model(
    "GameEvent",
new mongoose.Schema({
    homeTeam:{
        type:String,
        required:true,
    },
    awayTeam:{
        type:String,
        required:true,
    },
    startHomeTeam:{
        type: Number,
        default: 0
    },
    startAwayTeam:{
        type: Number,
        default: 0
    },
    gameApi:{
        type: ObjectId,
          ref: "Game"
    },
    bet:[0,0,0],
    startGame:{
        type: Date,
        required:true
    },
})
)
module.exports = gameEventSchema;
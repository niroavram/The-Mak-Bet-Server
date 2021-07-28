const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const gameSchema = mongoose.model(
    "Game",
new mongoose.Schema({
    league_id:{
        type:Number,
        required:true,
    },
    homeTeam:{
        type:String,
        required:true,
    },
    awayTeam:{
        type:String,
        required:true,
    },
    scoreHomeTeam:{
        type: Number,
        default: null
    },
    scoreAwayTeam:{
        type: Number,
        default: null
    },
    cornersHome:{
        type: Number,
        default: null
    },
    cornersAway:{
        type: Number,
        default: null
    },
    firstYellowCard:{
        type: String,
        default: null
    },
    dateGame:{
        type: Date,
        required:true
    },
    game_id:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        default:"prematch",
    },
    homeFlag:{
        type:String,
    },
    awayFlag:{
        type:String,
    },
    lastUpdate:{
        type: Date,
        default:Date.now(),
    }
})
)
module.exports = gameSchema;
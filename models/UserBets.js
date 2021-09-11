const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const userBetsSchema = mongoose.model(
    "UserBets",
new mongoose.Schema({
    create_at:{
        type: Date,
        default: Date.now()
    },
    mask:{
        type:String,
    },
    gameEvents:[{
        type:ObjectId,
        ref:"GameEvent"
    }],
    created_by:{
        type:ObjectId,
        ref:"User"
    },
})
)
module.exports = userBetsSchema;


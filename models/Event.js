const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const eventSchema = mongoose.model(
    "Event",
new mongoose.Schema({
    firstGame:{
        type: Date,
        required:true
    },
    lastGame:{
        type: Date,
        required:true
    },
    isMask:{
        type:Boolean,
        required:true
    },
    doubles:{
        type: Number,
        required:true
    },
    triangles:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    gamesEvent:[{
        type:ObjectId,
        ref:"GameEvent"
    }],
    userBets:[{
        type:ObjectId,
        ref:"UserBets"
    }],
})
)
module.exports = eventSchema;
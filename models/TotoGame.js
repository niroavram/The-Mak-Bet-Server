const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const totoGameSchema = mongoose.model(
    "TotoGame",
new mongoose.Schema({

    isActive:{
        type:Boolean,
        default: false
    },
    totalPrice:{
        type: Number,
        default: 0
    },
    round:{
        type: Number,
        default: 0
    },
    events:[{
        type:ObjectId,
        ref:"Event"
    }],
    winner:[{
        type: ObjectId,
          ref: "User"
    }],
    totoGroupFather:{
        type: ObjectId,
          ref: "TotoGroup"
    }
})
)
module.exports = totoGameSchema;
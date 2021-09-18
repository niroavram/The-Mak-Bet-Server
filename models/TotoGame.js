const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const totoGameSchema = mongoose.model(
    "TotoGame",
new mongoose.Schema({

    isActive:{
        type:Boolean,
        default: true
    },
    totalPrice:{
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
    },
    group_id:{
        type: ObjectId,
        ref: "TotoGame"
    }
})
)
module.exports = totoGameSchema;
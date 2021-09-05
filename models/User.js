const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = mongoose.model(
    "User",
new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        default: 10000
    }
})
)
module.exports = userSchema;

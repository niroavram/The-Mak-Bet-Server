const mongoose = require("mongoose");
const League = mongoose.model("League");
const Game = mongoose.model("Game");
var unirest = require("unirest");
const api_url = "https://api-football-v1.p.rapidapi.com/v3/fixtures";
const {leagues_id} = require('./leagues')


exports.Testing = function () {
    var test1 = 140
    var test2 =  141
if(leagues_id[test1]){
    console.log("test1 good")
}else{
    console.log("test1 not good")
}
if(leagues_id[test2]){
    console.log("test2 good")
}else{
    console.log("test2 not good")
}


}
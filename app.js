const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./key");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors("http://localhost:3000/"||"https://www.beenyan.com/"));

mongoose.connect(MONGOURI,{
  useNewUrlParser:true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

require("./models/Event");
require("./models/Game");
require("./models/League");
require("./models/GameEvent");
require("./models/TotoGame");
require("./models/TotoGroup");
require("./models/User");
require("./models/UserBets");
const {updateGames,collectGamesApi,finishGames,Testing} = require("./football-api/apiConroller")

// require('./models/post')
var authUser = require("./routes/authUser")
var authGame = require("./routes/authGame")
var authToto = require("./routes/authToto")
var authLeague = require("./routes/authLeagues")
var authEvent = require("./routes/authEvent")
var authUserbets = require("./routes/authUserbets")

app.use(express.json());
app.use(authUser,authToto,authGame);
app.use(authEvent,authLeague,authUserbets);

setInterval(function() {
  collectGamesApi();
  }, 1000*60*60*24,);
  setInterval(function() {
    updateGames();
    }, 1000*30,);
  setInterval(function() {
    finishGames();
    }, 1000*60*6,);
  // let S="id,name,age\n1,Jack,68"
  // let C="age"
  // Testing()

app.listen(PORT,()=>{
    console.log("server running on PORT",PORT)
})


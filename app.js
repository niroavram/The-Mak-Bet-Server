const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./key");
const cors = require("cors");
app.use(cors());

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo yeah");
});

mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
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
app.use(express.json());
app.use(authUser,authToto,authGame,authEvent,authLeague);
// setInterval(function() {
//   collectGamesApi();
//   }, 1000*60*60*5,);
//   setInterval(function() {
//     updateGames();
//     }, 1000*60*5,);
  // setInterval(function() {
  //   finishGames();
  //   }, 1000*15,);
  Testing()
app.listen(PORT, () => {
  console.log("server is running on", PORT);
});

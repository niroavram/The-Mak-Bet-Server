const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Event = mongoose.model("Event");
const UserBets = mongoose.model("UserBets");
const TotoGame = mongoose.model("TotoGame");
const TotoGroup = mongoose.model("TotoGroup");
const GameEvent = mongoose.model("GameEvent");

// mongoose.set("useFindAndModify", false);
const requireLogin = require("../middleware/requireLogin");

// const games = [
//   {
//     homeTeam: "Fulham",
//     awayTeam: "Arsenal",
//     startHomeTeam: 0,
//     startAwayTeam: 0,
//     startGame: "2017-04-25T06:23:36.510Z",
//     gameApi: "60d9d38845165620ec6df5bc",
//     bet: [0, 0, 0],
//   },
//   {
//     homeTeam: "Fulham",
//     awayTeam: "Arsenal",
//     startHomeTeam: 0,
//     startAwayTeam: 0,
//     startGame: "2017-04-25T06:23:36.510Z",
//     gameApi: "60d9d38845165620ec6df5bc",
//     bet: [0, 0, 0],
//   },
//   {
//     homeTeam: "Fulham",
//     awayTeam: "Arsenal",
//     startHomeTeam: 0,
//     startAwayTeam: 0,
//     startGame: "2017-04-25T06:23:36.510Z",
//     gameApi: "60d9d38845165620ec6df5bc",
//     bet: [0, 0, 0],
//   },
//   {
//     homeTeam: "First",
//     awayTeam: "Arsenal",
//     startHomeTeam: 0,
//     startAwayTeam: 0,
//     startGame: "2016-04-25T06:23:36.510Z",
//     gameApi: "60d9d38845165620ec6df5bc",
//     bet: [0, 0, 0],
//   },
//   {
//     homeTeam: "Last",
//     awayTeam: "Arsenal",
//     startHomeTeam: 0,
//     startAwayTeam: 0,
//     startGame: "2022-04-25T06:23:36.510Z",
//     gameApi: "60d9d38845165620ec6df5bc",
//     bet: [0, 0, 0],
//   },
// ];

Router.post("/create-newevent",requireLogin,(req, res) => {
  const { isMask, doubles, triangles, price,mygames,totogame_id } = req.body;
  const games =mygames
  if ((!doubles, !isMask, !triangles, !price,!games)) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  var i = 0,firstGame,lastGame;
  firstGame = games[0].startGame;
  lastGame = games[0].startGame;
  const gamesEvent = [];
  while (i < games.length) {
    const {
      homeTeam,
      awayTeam,
      startAwayTeam,
      startHomeTeam,
      gameApi,
      bet,
      startGame,
    } = games[i];
    var game = new GameEvent({
      homeTeam,
      awayTeam,
      startAwayTeam,
      startHomeTeam,
      gameApi,
      bet,
      startGame,
    });
    game.save().catch((err) => {
      res.status(422).json({ error: " error hereeeeeeeeee"})
    });
    gamesEvent.push(game);
    if (firstGame > startGame) {
      firstGame = startGame;
    }
    if (lastGame < startGame) {
      lastGame = startGame;
    }
    i++;
  }
  const event = new Event({
    firstGame,
    lastGame,
    isMask,
    doubles,
    triangles,
    price,
    gamesEvent: gamesEvent,
  });
  event
    .save()
    .then((result_event) => {
      event 
      TotoGame.findOneAndUpdate(
        { _id: totogame_id },
        {
          $push: { events: result_event },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("TotoGame is wrong");
          } else {
            console.log(doc);
          }
        }
      );
      res.json({ event: result_event });
    })
    .catch((err) => {
      res.json(err);
    });
});

Router.post("/create-totogame",requireLogin,(req, res) => {
  const {  group_id } = req.body;
  if ((!group_id)) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
    const totogame = new TotoGame({
      group_id
    });
    totogame
      .save()
      .then((result) => { 
        TotoGroup.findOneAndUpdate(
          { _id: group_id },
          {
            $push: { totoGames: result },
          },
          { new: true },
          (err, doc) => {
            if (err) {
              res.json(err);
            } else {
              res.json(doc)
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });


});


module.exports = Router;

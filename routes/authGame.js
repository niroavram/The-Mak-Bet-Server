const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const GameEvent = mongoose.model("GameEvent");
const Game = mongoose.model("Game");

// mongoose.set("useFindAndModify", false);
const requireLogin = require('../middleware/requireLogin')

Router.post("/create-game-event",requireLogin, (req, res) => {
    const {homeTeam,awayTeam, startHomeTeam,startAwayTeam,startGame} = req.body;
    if (!homeTeam , !awayTeam, !startHomeTeam, !startAwayTeam, !startGame) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const GameE = new GameEvent({
      homeTeam,
      awayTeam,
      startHomeTeam,
      startAwayTeam,
      startGame,
      bet: [0,0,0]
    });
    GameE
      .save()
      .then((result) => {
        console.log(result);
        res.json({ gameevent: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  Router.get("/userbets", requireLogin, (req, res) => {
    const {eventId}= req.body
    Event.find({_id: eventId})
      .then((event)=>{
        res.json(event);
      })
         .catch((err) => {
            console.log(err);
          });
       
  });
  Router.get("/pregames", requireLogin, (req, res) => {
    const {eventId}= req.body
    Game.find({status: "prematch"})
      .then((event)=>{
        res.json(event);
      })
         .catch((err) => {
            console.log(err);
          });
       
  });
  Router.get("/gameByID", requireLogin, (req, res) => {
    const {gameID}= req.body
    Game.findById(gameID)
      .then((event)=>{
        res.json(event);
      })
         .catch((err) => {
            console.log(err);
          });
       
  });



  module.exports = Router
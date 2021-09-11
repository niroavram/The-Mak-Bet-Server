const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const League = mongoose.model("League");
const Game = mongoose.model("Game")
// mongoose.set("useFindAndModify", false);

Router.post("/create-new-league", (req, res) => {
    const {league_name,league_id,flag} = req.body;
    if (!league_name , !league_id, !flag) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const GameE = new League({
      league_name,
      league_id,
      flag,
    });
    GameE
      .save()
      .then((result) => {
        console.log(result);
        res.json({ league: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  Router.put("/new-game", (req, res) => {
    const { league , game_id, homeTeam, awayTeam, dateGame} = req.body;
    if (!league, !game_id, !homeTeam, !awayTeam, !dateGame) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    const game = new Game({
        league,
        game_id,
        homeTeam,
        awayTeam,
        dateGame
    });
    game
      .save()
      .catch((err) => {
        console.log(err);
      });
    League.findByIdAndUpdate(
      "608040bdf89d127a50b5e8f3",
      {
        $push: { upcoming: game },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
  });
  Router.get("/get-game", (req, res) => {
 Game.find({game_id: 3})
 .then((gameee)=>{
if(gameee==""){
    res.json(true);
}else{
    res.json(false);
} })
 .catch((err) => {
    console.log(err);
  });
   
  });
  Router.get("/leagues-upcoming", (req, res) => {
    League.find()
    .populate("upcoming")
    .then((leagues)=>{
     res.json(leagues);
    })
    .catch((err) => {
       console.log(err);
     });
      
     });
     Router.get("/leagues", (req, res) => {
      League.find()
      .populate("upcoming")
      .then((leagues)=>{
       res.json(leagues);
      })
      .catch((err) => {
         console.log(err);
       });
        
       });
     Router.get("/league", (req, res) => {
      League.find({league_id: 61})
      .populate("upcoming")
      .then((leagues)=>{
       res.json(leagues);
      })
      .catch((err) => {
         console.log(err);
       });
        
       });
  module.exports = Router
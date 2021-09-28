const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const GameEvent = mongoose.model("GameEvent");
const Event = mongoose.model("Event");

const requireLogin = require('../middleware/requireLogin')


  Router.get("/lastEvent", (req, res) => {
    const {eventId}= req.body
    Event.find({_id: eventId})
    .populate({path:"gamesEvent",populate:{path: "gameApi"}})
    .populate({path:"userBets",populate:{path: "gameEvents"}})
      .then((event)=>{
        res.json(event);
      })
         .catch((err) => {
            console.log(err);
          });
       
  });





  module.exports = Router
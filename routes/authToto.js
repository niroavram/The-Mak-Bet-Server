const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const TotoGroup = mongoose.model("TotoGroup");
// mongoose.set("useFindAndModify", false);
const TotoGame = mongoose.model("TotoGame");

const requireLogin = require('../middleware/requireLogin')

Router.post("/create-toto-group",requireLogin, (req, res) => {
    const {name,isPublic} = req.body;
    if (!name) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const code = Math.random().toString(36).slice(-8);
    TotoGroup.findOne({code:code})
    .then((savedUser)=>{
        if(savedUser){
             code = Math.random().toString(36).slice(-8);
        }
        const totoGroup = new TotoGroup({
          name,
          code,
          isPublic,
          admins: [req.user],
          myUsers: [req.user]
        });
        totoGroup
          .save()
          .then((result) => {
            console.log(result);
            res.json({ totogroup: result });
          })
          .catch((err) => {
            console.log(err);
          });
    })

    
  });

  Router.put("/join-toto-group",requireLogin, (req, res) => {
    const {code} = req.body;
    if(!code){
      return res.status(422).json({ error: "Please enter the code group" });
    }
    TotoGroup.findOneAndUpdate({code: code},
      {
        $push: { myUsers: req.user._id },
        },
        {
        new: true,
        })
        .exec((err, result) => {
          if (err) {
          return res.status(422).json({ error: err });
          } else {
            res.status(200).json({ totogroup: result,message: "Mazal Tov You are in the group" });
          }
        });
      
  });

  Router.get("/get-toto-game", (req, res) => {
    const {group_id} = req.body
    TotoGame.find({group_id})
      .populate({path:"events",populate:{ path: 'gamesEvent'}})
      .then((leagues)=>{
       res.json(leagues);
      })
      .catch((err) => {
         console.log(err);
       });
  });

  Router.get("/my-toto-group", requireLogin, (req, res) => {
    TotoGroup.find({ myUsers: req.user })
      .populate("myUsers")
      .populate("totoGames")
      .then((totogroup) => {
        res.json({ totogroup });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  Router.get("/group", requireLogin, (req, res) => {
    const {group_id} = req.body
    TotoGroup.find({ _id: group_id })
      .populate("myUsers")
      .populate("admins")
      .populate({path: "totoGames", populate:{path:"events"}})
      .then((totogroup) => {
        res.json({ totogroup });
      })
      .catch((err) => {
        console.log(err);0
      });
  });
  Router.get("/group/:groupcode", requireLogin, (req, res) => {
    TotoGroup.findOne({ code: req.body.groupcode })
      .then((totogroup) => {

        res.json({ totogroup });
      })
      .catch((err) => {
        res.status(404).json({error: err})
      });
  });
  module.exports = Router
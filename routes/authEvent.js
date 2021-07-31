const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Event = mongoose.model("Event");
const UserBets = mongoose.model("UserBets");
const GameEvent = mongoose.model("GameEvent");

// mongoose.set("useFindAndModify", false);
const requireLogin = require("../middleware/requireLogin");

const games = [
  {
    homeTeam: "Fulham",
    awayTeam: "Arsenal",
    startHomeTeam: 0,
    startAwayTeam: 0,
    startGame: "2017-04-25T06:23:36.510Z",
    gameApi: "60d9d38845165620ec6df5bc",
    bet: [0, 0, 0],
  },
  {
    homeTeam: "Fulham",
    awayTeam: "Arsenal",
    startHomeTeam: 0,
    startAwayTeam: 0,
    startGame: "2017-04-25T06:23:36.510Z",
    gameApi: "60d9d38845165620ec6df5bc",
    bet: [0, 0, 0],
  },
  {
    homeTeam: "Fulham",
    awayTeam: "Arsenal",
    startHomeTeam: 0,
    startAwayTeam: 0,
    startGame: "2017-04-25T06:23:36.510Z",
    gameApi: "60d9d38845165620ec6df5bc",
    bet: [0, 0, 0],
  },
  {
    homeTeam: "First",
    awayTeam: "Arsenal",
    startHomeTeam: 0,
    startAwayTeam: 0,
    startGame: "2016-04-25T06:23:36.510Z",
    gameApi: "60d9d38845165620ec6df5bc",
    bet: [0, 0, 0],
  },
  {
    homeTeam: "Last",
    awayTeam: "Arsenal",
    startHomeTeam: 0,
    startAwayTeam: 0,
    startGame: "2022-04-25T06:23:36.510Z",
    gameApi: "60d9d38845165620ec6df5bc",
    bet: [0, 0, 0],
  },
];

Router.post("/create-newevent", (req, res) => {
  const { isMask, doubles, triangles, price } = req.body;
  if ((!doubles, !isMask, !triangles, !price)) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  var i = 1,firstGame, lastGame;
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
      startGame,
    } = games[i];
    var game = new GameEvent({
      homeTeam,
      awayTeam,
      startAwayTeam,
      startHomeTeam,
      gameApi,
      startGame,
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
    gamesEvent: games,
  });
  event
    .save()
    .then((result) => {
      res.json({ event: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

Router.put("/create-userbets", requireLogin, (req, res) => {
  const { mask, triangles, doubles, gameEvents, eventId } = req.body;
  if (!mask) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  var countDoubles = 0;
  var countTriangles = 0;
  for (i = 0; i < gameEvents.length; i++) {
    var sumBet =
      gameEvents[i].bet[0] + gameEvents[i].bet[1] + gameEvents[i].bet[2];
    if (sumBet < 1) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    if (sumBet == 2) {
      countDoubles++;
    }
    if (sumBet == 3) {
      countTriangles++;
    }
  }
  if (doubles != countDoubles || triangles != countTriangles) {
    return res.status(422).json({ error: "Please stand in rules" });
  }
  console.log(req.user);
  const userbet = new UserBets({
    created_by: req.user,
    mask,
    gameEvents: gameEvents,
  });
  userbet.save().catch((err) => {
    console.log(err);
  });
  Event.findByIdAndUpdate(
    eventId,
    {
      $push: { userBets: userbet },
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

Router.get("/get-userbets/:eventId", requireLogin, (req, res) => {
  const { eventId } = req.params;
  Event.find({ _id: eventId }).then((event) => {
    UserBets.find({ _id: { $in: event[0].userBets } })
      .then((userGamesbet) => {
        res.json({ event, userGamesbet });
      })

      .catch((err) => {
        res.json(err);
      });
  });
});
module.exports = Router;

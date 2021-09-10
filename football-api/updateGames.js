const mongoose = require("mongoose");
const League = mongoose.model("League");
const Game = mongoose.model("Game");
var unirest = require("unirest");
const api_url = "https://api-football-v1.p.rapidapi.com/v3/fixtures";
const { FinishGames } = require("./FinishGames");
const { leagues_id } = require("./leagues");

var reqLive = unirest("GET", api_url);
exports.updateGames = function () {
  reqLive.query({
    live: "all",
  });

  reqLive.headers({
    "x-rapidapi-key": "1ad37ab4demsh7ccfc85b716c126p11ff41jsndd1091dd288b",
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    useQueryString: true,
  });
  reqLive.end(function (res) {
    const gamesInplay = [];
    var id = 140;

    if (res.error) throw new Error(res.error);
    var games = res.body.response;
    games.forEach((element) => {
      if (leagues_id[element.league.id]) {
        gamesInplay.push(element.fixture.id);
        Game.findOneAndUpdate(
          { game_id: element.fixture.id },
          {
            $set: {
              scoreHomeTeam: element.goals.home,
              scoreAwayTeam: element.goals.away,
              status: "live",
              lastUpdate: Date.now(),
            },
          },
          { new: true },
          (err, result) => {
            if (err) {
              console.log(err);
            }
            if (result) {
              console.log(result);
              if (Date.now() - result.dateGame < 1000 * 60 * 5) {
                League.findOneAndUpdate(
                  { upcoming: result._id },
                  {
                    $pull: { upcoming: result._id },
                  },
                  { new: true },
                  (err, doc) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(doc);
                    }
                  }
                );
                League.findOneAndUpdate(
                  { league_id: result.league_id },
                  {
                    $push: { inplay: result._id },
                  },
                  { new: true },
                  (err, doc) => {
                    if (err) {
                      console.log("Something wrong when updating data!");
                    } else {
                      console.log(doc);
                    }
                  }
                );
              }
            }
          }
        );
      }
    });
    FinishGames(gamesInplay);
  });
};

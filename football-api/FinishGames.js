const mongoose = require("mongoose");
const League = mongoose.model("League");
const Game = mongoose.model("Game");
var unirest = require("unirest");
const api_url = "https://api-football-v1.p.rapidapi.com/v3/fixtures";


exports.FinishGames = function (gamesInplay) {
  League.find().then((result) => {
    var inplayA;
    for (var i = 0; i < result.length; i++) { 
       inplayA = result[i].inplay;
      for (var m = 0; m < inplayA.length; m++) {
        var _id = inplayA[m]
        Game.findOne({_id: _id})
        .then(game => {
          if(!game){
            console.log(game)
          }else{         
         let isFinish = true
         for(var l=0;l<gamesInplay.length;l++){
           if(game.game_id==gamesInplay[l]){
             isFinish=false
           }
         }
          if (isFinish) {
            var activeGame
            var req = unirest("GET", api_url);
            req.query({
              id: game.game_id,
            });

            req.headers({
              "x-rapidapi-key":
                "1ad37ab4demsh7ccfc85b716c126p11ff41jsndd1091dd288b",
              "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
              useQueryString: true,
            });

            req.end(function (res) {
                 activeGame = res.body.response[0];
                 let corners = cornerS(activeGame.statistics[0],activeGame.statistics[1])
                 console.log(corners)
                 Game.findByIdAndUpdate(
                  _id,
                  { $set: { scoreHomeTeam: activeGame.goals.home, scoreAwayTeam: activeGame.goals.away ,cornersAway: corners.cornerAway, cornersHome: corners.cornerHome,status:"played",lastUpdate: Date.now()} },
                  { new: true },
                  (err, result) => {
                    if (err) {
                      console.log(" data!");
                    }
                    League.findOneAndUpdate(
                      { inplay: _id },
                      {
                        $pull: { inplay: _id },
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
                        $push: { played: result._id },
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
                );
            });
            
           } 
          }
        });
      }
    } 
  });
};

function cornerS (home,away){
  const stats = {
    cornerHome: home.statistics[7].value,
    cornerAway: away.statistics[7].value
  }
return stats
}
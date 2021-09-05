const mongoose = require("mongoose");
const League = mongoose.model("League");
const Game = mongoose.model("Game");
var unirest = require("unirest");
const api_url =  "https://api-football-v1.p.rapidapi.com/v3/fixtures"



// req.query({
// 	"id": "686348"
// });
// req.query({
// 	"live": "all",
// 	"league": "384"
// });
exports.CollectGames = function(league_id) {
var req = unirest("GET", api_url);
req.query({
	"league": league_id,
	"next": "21",
    "timezone": "Asia/Jerusalem"
});


req.headers({
	"x-rapidapi-key": "1ad37ab4demsh7ccfc85b716c126p11ff41jsndd1091dd288b",
	"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
	var games = res.body.response;
	games.forEach(element => {
		Game.find({game_id:element.fixture.id}, function(err, result){
			if (err) {
				console.log(err);
			  } else {
					if(result.length){
						var league=element.league.name
						var league_id=element.league.id
						var game_id=element.fixture.id
						var	homeTeam=element.teams.home.name
						var	homeFlag=element.teams.home.logo
						var awayTeam=element.teams.away.name
						var awayFlag=element.teams.away.logo
						var dateGame=element.fixture.date
						 
						const new_game = new Game({
							league,
							league_id,
							game_id,
							homeTeam,
							awayTeam,
							dateGame,
							homeFlag,
							awayFlag
						});
						new_game
						.save()
						.catch((err) => {
							console.log(err);
						})
						// console.log("adsasdasdasddsasadsda",new_game)
						League.findOneAndUpdate(
							{league_id: element.league.id},
							{
							$push: { upcoming: new_game },
							},
							{
							new: true,
							})
							.exec((err, result) => {
								console.log(new_game)
								if (err) {
								return res.status(422).json({ error: err });
								} else {
									// console.log("New result", result)
								}
							});

					}else{
						console.log("errrr")
					}
			}
		})
	});
});
}

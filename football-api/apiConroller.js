
const leagues_id =[
{
	name: "Euro Championship",
	id: 4,
	flag: "https://media.api-sports.io/football/leagues/4.png",
	leagueIdByMongo: "60858bce33be9f80300c7a85"
},
{name: "France Legue 1",
	id: 61,
	flag: "https://media.api-sports.io/flags/fr.svg",
	leagueIdByMongo: "60858c4d33be9f80300c7a8d"
},
{name: "England Premier League",
id: 39,
flag: "https://media.api-sports.io/flags/gb.svg",
leagueIdByMongo: "60858c1b33be9f80300c7a8b"

},
{name: "Germany Bundesliga 1",
id: 78,
flag: "https://media.api-sports.io/flags/de.svg",
leagueIdByMongo: "60858c2533be9f80300c7a8c"
},
{
	name: "Italy Seria-A",
id: 135,
flag: "https://media.api-sports.io/flags/it.svg",
leagueIdByMongo: ""
},
{
	name: "Netherland Eredivisie",
id: 88,
flag: "https://media.api-sports.io/flags/nl.svg",
leagueIdByMongo: "60858c1333be9f80300c7a8a"
},
{
	name: "Spain Primera Division",
id: 140,
flag: "https://media.api-sports.io/flags/es.svg",
leagueIdByMongo: "60858c0c33be9f80300c7a89"
},
{
	name: "UEFA Champions League",
id: 2,
flag: "https://media.api-sports.io/football/leagues/2.png",
leagueIdByMongo: ""
},
{
	name: "UEFA Europa League",
id: 3,
flag: "https://media.api-sports.io/football/leagues/3.png",
leagueIdByMongo: ""
},
{
	name: "Israel Ligat A'al",
id: 383,
flag: "https://media.api-sports.io/football/leagues/3.png",
leagueIdByMongo: "60858bfc33be9f80300c7a88"
},
{
	name: "israeli state cup",
id: 384,
flag: "https://media.api-sports.io/football/leagues/3.png",
leagueIdByMongo: "60858bf233be9f80300c7a87"
},

]
const {CollectGames} = require('./CollectorGames')
const {updateGames} = require('./updateGames')
const {FinishGames} = require('./FinishGames')
const {Testing} = require('./Testing')

  exports.collectGamesApi =async () => {
	CollectGames(61)

	// for(var i=0;i<leagues_id.length;i++){
	// 	CollectGames(leagues_id[i].id)
    // }

  }
  exports.updateGames = async () => {
	updateGames();
  }

  exports.finishGames = async () => {
	let isMeleh =true	
	if(isMeleh){
		console.log("True")
	}else{
		console.lof("false")
	}
}	
exports.Testing = async () => {
	Testing()
}

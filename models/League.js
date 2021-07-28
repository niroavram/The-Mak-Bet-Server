const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const leagueSchema = mongoose.model(
  "League",
  new mongoose.Schema({
    league_name: {
      type: String,
      required: true,
    },
    league_id: {
      type: Number,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    played: [
      {
        type: ObjectId,
        ref: "Game",
      },
    ],
    upcoming: [
      {
        type: ObjectId,
        ref: "Game",
      },
    ],
    inplay: [
      {
        type: ObjectId,
        ref: "Game",
      },
    ],
  })
);
module.exports = leagueSchema;

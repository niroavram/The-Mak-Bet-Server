const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const totoGroupSchema = mongoose.model(
  "TotoGroup",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    admins: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    isPublic: {
      type: Boolean,
    },
    photo: {
      type: String,
    },
    totoGames: [
      {
        type: ObjectId,
        ref: "TotoGame",
      },
    ],
    myUsers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  })
);
module.exports = totoGroupSchema;

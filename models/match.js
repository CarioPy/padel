const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  mid: {
    type: String,
    required: [true, "Please add a Match ID"],
    unique: true,
    trim: true,
  },

  player1ID: {
    type: String,
    required: [true, "Please add player1"],
  },

  player2ID: {
    type: String,
    required: [true, "Please add player2"],
  },

  player3ID: {
    type: String,
    required: [true, "Please add player3"],
  },

  player4ID: {
    type: String,
    required: [true, "Please add player4"],
  },

  score_teamA: {
    type: Number,
    required: [true, "Please add a score for team A"],
  },

  score_teamB: {
    type: Number,
    required: [true, "Please add a score for team B"],
  },
});

module.exports = mongoose.models.Match || mongoose.model("Match", MatchSchema);

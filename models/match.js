const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [40, "Name length cannot exceed 40 characters"],
  },

  player1ID: {
    type: String,
    required: [true, "Please add player1"],
  },

  player2ID: {
    type: String,
    required: [true, "Please add player1"],
  },

  player3ID: {
    type: String,
    required: [true, "Please add player1"],
  },

  player4ID: {
    type: String,
    required: [true, "Please add player1"],
  },

  score: {
    type: Number,
    required: [true, "Please add a score"],
  },
});

module.exports = mongoose.models.Match || mongoose.model("Match", MatchSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
require("dotenv").config();

mongoose.connect(process.env.DATABASE);

const scoreSchema = Schema({
  game: {
    type: String,
    required: [true, "Score must have game."],
  },
  value: {
    type: String,
    required: [true, "Score must have value."],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Score",
    required: [true, "Score must have user."],
  },
});

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "User must have name."],
  },
  username: {
    type: String,
    required: [true, "User must have username."],
    unique: true,
  },
  region: {
    type: String,
    required: [true, "User must have region."],
  },
  authQuestion: {
    type: String,
    required: [true, "User must have authQuestion."],
  },
  authAnswer: {
    type: String,
    required: [true, "User must have authAnswer."],
  },
  favoriteGame: String,
  scores: [{ type: Schema.Types.ObjectId, ref: "Score" }],
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User: User,
};

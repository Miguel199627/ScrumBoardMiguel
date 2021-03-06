const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user" },
  name: String,
  description: String,
  status: String,
  imageUrl: String,
  deleted_at: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
});

const Board = mongoose.model("board", Schema);
module.exports = Board;

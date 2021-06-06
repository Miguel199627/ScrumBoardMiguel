const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  deleted_at: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
});

const Role = mongoose.model("role", Schema);
module.exports = Role;

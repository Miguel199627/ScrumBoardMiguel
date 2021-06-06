const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  status: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now() },
});

Schema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      roleId: this.roleId,
      iat: moment().unix(),
    },
    process.env.SECRET_kEY_JWT
  );
};

const User = mongoose.model("user", Schema);
module.exports = User;

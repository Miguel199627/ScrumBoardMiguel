/**
 * Descripcion: Routes of auth
 * Author: Miguel Angel Cerquera R
 * Updated date: 3/06/2021
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email or password");

  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!user.status || !hash)
    return res.status(400).send("Incorrect email or password");

  try {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    res.status(400).send("Login error");
  }
});

module.exports = router;

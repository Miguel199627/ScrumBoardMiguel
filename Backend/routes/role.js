/**
 * Descripcion: Routes of roles
 * Author: Miguel Angel Cerquera R
 * Updated date: 3/06/2021
 */

const express = require("express");
const router = express.Router();
const Role = require("../models/role");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Admin = require("../middleware/admin");

router.post("/registerRole", Auth, UserAuth, Admin, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const roleExists = await Role.findOne({ name: req.body.name });
  if (roleExists)
    return res.status(401).send("Process failed: role already exists");

  const role = new Role({
    name: req.body.name,
    description: req.body.description,
  });

  const result = await role.save();
  if (!result) return res.status(401).send("Failed to register role");
  res.status(200).send({ result });
});

router.get("/listRole", Auth, UserAuth, Admin, async (req, res) => {
    const role = await Role.find();
    if (!role) return res.status(401).send("No role");
    res.status(200).send({ role });
});

module.exports = router;

/**
 * Descripcion: Routes of board
 * Author: Miguel Angel Cerquera R
 * Updated date: 6/06/2021
 */

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multiparty = require("connect-multiparty");
const fs = require("fs");
const moment = require("moment");
const Board = require("../models/board");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const mult = multiparty();
const path = require("path");
const Upload = require("../middleware/file");

router.post("/saveTask", Auth, UserAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");

  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });
  const result = await board.save();
  if (!result)
    return res.status(401).send("Process failed: Failed to register task");
  res.status(200).send({ result });
});

router.post("/saveTaskImg", mult, Upload, Auth, UserAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");
  let imageUrl = "";
  if (req.files !== undefined && req.files.image.type) {
    const url = req.protocol + "://" + req.get("host") + "/";
    let serverImg =
      "./uploads/" + moment().unix() + path.extname(req.files.image.path);
    fs.createReadStream(req.files.image.path).pipe(
      fs.createWriteStream(serverImg)
    );
    imageUrl =
      url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
  }
  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
    imageUrl: imageUrl,
  });
  const result = await board.save();
  if (!result)
    return res.status(401).send("Process failed: Failed to register task");
  res.status(200).send({ result });
});

router.get("/listTask", Auth, UserAuth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.user._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");
  const board = await Board.find({ userId: req.user._id });
  if (!board) return res.status(401).send("Process failed: No tasks to delete");
  res.status(200).send({ board });
});

router.put("/updateTask", Auth, UserAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.description ||
    !req.body.status
  )
    return res.status(401).send("Process failed: Incomplete data");

  const validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");

  const board = await Board.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    name: req.body.name,
    status: req.body.status,
    description: req.body.description,
  });
  if (!board) return res.status(401).send("Process failed: Task not found");
  res.status(200).send({ board });
});

router.delete("/deleteTask/:_id", Auth, UserAuth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");
  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(401).send("Process failed: Task not found");
  res.status(200).send({ message: "Task deleted" });
});

module.exports = router;

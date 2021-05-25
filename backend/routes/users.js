/** API routes for users. */

const express = require("express");
const router = new express.Router();
const process = require("process");
const User = require("../models/usersModel");
const { ensureCorrectUser } = require("../middleware/auth");
process.env.NODE_ENV = "test";

router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const user = await User.findOne(req.params.id);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  // console.log("creating a news user");
  try {
    const { user, token } = await User.register(req.body);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async function (req, res, next) {
  //TODO: add middleware, correctuser
  try {
    const updatedUser = await User.update(req.body);
    // console.log(updatedUser);
    return res.json(updatedUser);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id/updatePassword", async function (req, res, next) {
  //TODO: add middleware, correctuser
  data = req.body;
  userId = req.params.id;
  try {
    updateSuccess = await User.updatePassword(data, userId);
    return res.json({ success: "updateSuccess" });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    deletedUsername = await User.delete(req.body);
    return res.json({ message: `User '${deletedUsername}' was deleted`, username: deletedUsername });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

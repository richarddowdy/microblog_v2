const jwt = require("jsonwebtoken");
const express = require("express");

const Router = require("express").Router;
const router = new Router();

const User = require("../models/usersModel");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../helpers/expressError");
const db = require("../db");

let TOKEN;

router.post("/login", async function (req, res, next) {
  try {

    const { username, password } = req.body;

    // console.log("Request body and username:", req.body, username);
    if (await User.authenticate({ username, password })) {
      let user = await User.findOne(username);
      // const is_admin = await User.adminStatus(username);
      let TOKEN = jwt.sign({ username, is_admin: user.is_admin }, SECRET_KEY);
      return res.json({ token: TOKEN, user })
    } else {
      throw new ExpressError("Invalid username/password", 401);
    }
  } catch (err) {
    //TODO: Catch the correct error
    return next(err);
  }
});

// Get the current user from the decoded token info
router.get("/:username", async function (req, res, next) {
  const username = req.params.username;
  // console.log(username);
  // console.log("USERNAME HIT")
  try {
    const result = await db.query(
      `SELECT id, username, is_admin 
      FROM users 
      WHERE username = $1`,
      [username]
    )
    let currentUser = result.rows[0];
    // console.log("new place", currentUser)
    return res.json(currentUser);
  } catch (err) {
    // console.log("backend error")
    return next(err);
  }
})

module.exports = router;
exports.variableName = TOKEN;
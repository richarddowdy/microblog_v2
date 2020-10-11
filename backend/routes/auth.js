const jwt = require("jsonwebtoken");
const express = require("express");

const Router = require("express").Router;
const router = new Router();

const User = require("../models/usersModel");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../helpers/expressError");
const db = require("../db");
const createToken = require("../helpers/createToken");


let TOKEN;


router.post("/login", async function(req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
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
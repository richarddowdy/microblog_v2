const jwt = require("jsonwebtoken");
const express = require("express");

const Router = require("express").Router;
const router = new Router();

const User = require("../models/usersModel");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../helpers/expressError");

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
    console.log("ERROR!!!!!!!!!!!!!!!!")
    return next(err);
  }
});


module.exports = router;
exports.variableName = TOKEN;
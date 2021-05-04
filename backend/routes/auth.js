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

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.login(req.body);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

// Get the current user from the decoded token info
router.get("/currentUser", async function (req, res, next) {
  const token = req.query.token;
  // console.log("USERNAME HIT")
  try {
    const currentUser = await User.authenticate(token);
    return res.json(currentUser);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
// exports.variableName = TOKEN;

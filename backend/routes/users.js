/** API routes for auth. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const bcrypt = require("bcrypt");
// const { BCRYPT_WORK_FACTOR } = require("../config");
const jsonscema = require("jsonschema");
const userSchema = require("../schema/userSchema.json");
const process = require("process");
const User = require("../models/usersModel");
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
  console.log("ID HIT");
  try {
    // TODO: This is going to be all content generated by user
    // but not the user's info

    /*
    TODO: 
    */
    // const result = await db.query(
    //   `SELECT u.id, u.username, u.first_name, u.last_name, u.email
    //   JSON_AGG(DISTINCT p.id) AS posts,
    //   JSON_AGG(DISTINCT c.id) AS comments
    //   FROM users u
    //   LEFT JOIN posts p ON p.user_id = u.id
    //   LEFT JOIN comments c ON c.user_id = u.id
    //   WHERE u.id = $1
    //   GROUP BY u.id
    //   ORDER BY u.id`,
    //   [req.params.id]
    // );
    const user = await User.findOne(req.params.id);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function (req, res, next) {
  console.log("creating a news user");
  try {
    const { user, token } = await User.register(req.body);
    return res.status(201).json({ user, token });
  } catch (err) {
    console.log("Oops, something went wrong. Please refresh the page and try again.", err);
    return next(err);
  }
});

router.patch("/:id", async function (req, res, next) {
  try {
    // const result = db.query(
    //   `UPDATE users
    //   SET username = $2, password = $3
    //   WHERE id = $1
    //   RETURNING *`,
    //   [id, username, password]
    // );
    // return res.json(result.rows[0])
    // const updatedUser = await User.update(username, { password });
    const updatedUser = await User.update(req.body);
    // console.log(updatedUser);
    return res.json(updatedUser);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id/updatePassword", async function (req, res, next) {
  data = req.body;
  userId = req.params.id;
  try {
    updateSuccess = await User.updatePassword(data, userId);
    return res.json({ success: "updateSuccess" });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:username", async function (req, res, next) {
  try {
    deletedUsername = await User.delete(req.params.username);
    return res.json({ message: `User '${deletedUsername}' was deleted`, username: deletedUsername });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

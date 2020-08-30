/** API routes for auth. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const jsonscema = require("jsonschema");
const userSchema = require("../schema/userSchema.json");
const { ensureCorrectUser, ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const process = require('process');
process.env.NODE_ENV = "test";


router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, username, is_admin FROM users ORDER BY id;`
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
})

router.get("/:id", async function (req, res, next) {
  console.log("ID HIT")
  try {
    const result = await db.query(
      `SELECT u.id, 
      u.username,
      JSON_AGG(DISTINCT p.id) AS posts,
      JSON_AGG(c.id) AS comments
      FROM users u
      JOIN posts p ON p.user_id = u.id
      JOIN comments c ON c.user_id = u.id
      WHERE u.id = $1
      GROUP BY u.id
      ORDER BY u.id`,
      [req.params.id]
    )
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
})



router.post("/", async function (req, res, next) {
  try {
    let result = jsonscema.validate(req.body, userSchema)
    if (!result.valid) {
      let listOfErrors = result.errors.map(error => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    console.log("passwords", password, hashedPassword);

    // this can be cleaned up by moving all db queries to MODELS
    const userResult = await db.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING id, username, is_admin`,
      [username, hashedPassword]
    )
    let createdUser = userResult.rows[0]
    console.log(userResult);
    console.log(createdUser);

    const TOKEN = jwt.sign({
      username: createdUser.username,
      is_admin: createdUser.is_admin
    }, SECRET_KEY);

    return res.status(201).json({ user: createdUser, token: TOKEN });

  } catch (err) {
    return next(err);
  }
})

router.patch("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const result = db.query(
      `UPDATE users 
      SET username = $2, password = $3
      WHERE id = $1
      RETURNING *`,
      [id, username, password]
    )
    // return res.json(result.rows[0])
  } catch (err) {
    return next(err);
  }
})

router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id
    const result = await db.query(
      `DELETE FROM users 
      WHERE id = $1
      RETURNING username`,
      [req.params.id]
    )
    deletedUsername = result.rows[0].username
    return res.json({ message: `User ${deletedUsername} Deleted`, username: deletedUsername })
  } catch (err) {
    return next(err);
  }
})


module.exports = router;
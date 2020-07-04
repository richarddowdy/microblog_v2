/** API routes for auth. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const jsonscema = require("jsonschema");
const userSchema = require("../schema/userSchema.json");

const process = require('process');
process.env.NODE_ENV = "test";


router.get("/", async function(req, res, next) {
  try {
    const result = await db.query(
      `SELECT id, username FROM users ORDER BY id;`
    );
    return res.json(result.rows);
  } catch (err){
    return next(err);
  }
})

router.get("/:id", async function(req, res, next){
  try{
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
  } catch (err){
    return next(err);
  }
})

router.post("/", async function(req, res, next){
  try{
    let result = jsonscema.validate(req.body, userSchema)
    if (!result.valid) {
      let listOfErrors = result.errors.map(error => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }
    
    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    console.log("passwords", password, hashedPassword);

    // this can be made more elegant by moving all db queries to MODELS
    let dbResponse = await db.query(
      `INSERT INTO users (username, password)
       VALUES ($1, $2)
       RETURNING id, username`,
       [username, hashedPassword]
    )
    let createdUser = dbResponse.rows[0]

    console.log(createdUser);

    const TOKEN = jwt.sign( { username : createdUser.username,
      //is_admin : createdUser.is_admin
    }, SECRET_KEY);

    return res.status(201).json({ user: createdUser, _token : TOKEN });

  } catch (err){
    return next(err);
  }
})

module.exports = router;
/** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const process = require('process');
const { authenticateJWT } = require('../middleware/auth');
const ExpressError = require("../helpers/expressError");

/** GET /   get overview of posts
 *
 * Returns:
 *
 * => [ { id,
 *        title,
 *        description,
 *        votes,
 *      },
 *      ...
 *    ]
 *
 */

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
              p.votes,
              p.user_id,
              u.username
      FROM posts p 
      JOIN users u ON p.user_id = u.id
      ORDER BY p.id
      `
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  get detail on post w/comments
 *
 * Returns:
 *
 * =>   { id,
 *        title,
 *        description,
 *        body,
 *        votes,
 *        comments: [ { id, text }, ... ],
 *      }
 */

router.get("/:id", async function (req, res, next) {
  console.log(req.params.id)
  try {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
              p.body,
              p.votes,
              p.user_id,
              u.username,
              CASE WHEN COUNT(c.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
                    JSON_BUILD_OBJECT('id', c.id, 'text', c.text, 'author', a.username)
                ) END AS comments
      FROM posts p 
      LEFT JOIN comments c ON p.id = c.post_id
      JOIN users u ON p.user_id = u.id
      LEFT JOIN users a ON a.id = c.user_id 
      WHERE p.id = $1
      GROUP BY p.id, u.username
      ORDER BY p.id;
      `, [req.params.id]
    );
    console.log(result.rows[0])
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** POST /[id]/vote/(up|down)    Update up/down as post
 *
 * => { votes: updated-vote-count }
 *
 */

router.post("/:id/vote/:direction", async function (req, res, next) {
  try {
    let delta = req.params.direction === "up" ? +1 : -1;
    const result = await db.query(
      "UPDATE posts SET votes=votes + $1 WHERE id = $2 RETURNING votes",
      [delta, req.params.id]);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** POST /     add a new post
 *
 * { title, description, body }  =>  { id, title, description, body, votes }
 *
 */

router.post("/", async function (req, res, next) {
  console.log("trying to make a new post");
  console.log(req.body);
  try {
    const {title, body, description, userId} = req.body;
    const result = await db.query(
      `INSERT INTO posts (title, description, body, user_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, title, description, body, votes, user_id`,
      [title, description, body, userId]);
    // if(!result.rows[0]) throw new ExpressError("Unable to create new post. Please refresh and try again.", 500);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** PUT /[id]     update existing post
 *
 * { title, description, body }  =>  { id, title, description, body, votes }
 *
 */

router.put("/:id", async function (req, res, next) {
  try {
    const {title, body, description} = req.body;
    const result = await db.query(
      `UPDATE posts SET title=$1, description=$2, body=$3
        WHERE id = $4 
        RETURNING id, title, description, body, votes`,
      [title, description, body, req.params.id]);
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[id]     delete post
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", async (req, res, next) => {
  try {
    await db.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;

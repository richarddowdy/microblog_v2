/** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();
const process = require("process");
const { authenticateJWT } = require("../middleware/auth");
const Post = require("../models/postsModel");
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
    const posts = await Post.findAll();
    return res.json(posts);
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
  console.log(req.params.id);
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
      `,
      [req.params.id]
    );
    console.log(result.rows[0]);
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
    const result = await Post.sendVote(delta, req.params.id);
    return res.json(result);
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
  // console.log("trying to make a new post");
  // console.log(req.body);
  try {
    const response = await Post.createPost(req.body);
    return res.status(201).json(response);
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
    const { title, body, description } = req.body;
    const newPost = await Post.updatePost(req.params.id, title, body, description);
    return res.json(newPost);
  } catch (err) {
    console.log(err);
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
    const message = await Post.deletePost(req.params.id);
    return res.json({ message });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

module.exports = router;

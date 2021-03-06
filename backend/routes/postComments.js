/** Routes for post comment. */

const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true });
const Comment = require("../models/commentsModel");

/** GET /        get comments for post
 *
 * => { id, text }
 *
 */

router.get("/", async function (req, res, next) {
  try {
    const comments = await Comment.findAll();
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
});

/** POST /      add a comment
 *
 * => { id, text }
 *
 */

router.post("/", async function (req, res, next) {
  //TODO: add middleware, isLoggedIn
  // const postId = req.params.post_id;
  const { author } = req.body;
  const data = { ...req.body, postId: req.params.post_id };
  try {
    const newComment = await Comment.createComment(data);
    return res.json({ ...newComment, author });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[id]      update comment
 *
 * => { id, text }
 *
 */

router.put("/:id", async function (req, res, next) {
  //TODO: add middleware, isLoggedIn

  // Currently no UI for this.
  try {
    const updatedComment = await Comment.updateComment(req.body.text, req.body.id);
    return res.json(updatedComment);
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]      delete comment
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", async function (req, res, next) {
  //TODO: add middleware, isLoggedIn
  try {
    const message = await Comment.delete(req.params.id);
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

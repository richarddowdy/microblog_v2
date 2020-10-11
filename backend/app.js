/** MicroBlog express app. */

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");
const postCommentsRoutes = require("./routes/postComments");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const ExpressError = require('./helpers/ExpressError');


const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());

const {authenticateJWT} = require("./middleware/auth")

app.use(authenticateJWT);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/posts/:post_id/comments", postCommentsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api", authRoutes); // "/login"


/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  // console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});


module.exports = app;
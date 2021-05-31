/** MicroBlog express app. */

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");
const postCommentsRoutes = require("./routes/postComments");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const ExpressError = require("./helpers/expressError");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());

const { authenticateJWT } = require("./middleware/auth");

app.use(authenticateJWT);

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/posts/:post_id/comments", postCommentsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api", authRoutes); // "/login"

/*
Code block pulled from https://bryanguner.medium.com/deploy-react-app-to-heroku-using-postgres-express-70b7ea807986
*/
// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));
  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}
// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(201).json({});
  });
}

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
    message: err.message,
  });
});

module.exports = app;

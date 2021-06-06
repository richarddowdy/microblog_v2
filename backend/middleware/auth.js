const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function authenticateJWT(req, res, next) {
  try {
    const tokenFromBody = req.body._token;
    const payload = jwt.verify(tokenFromBody, SECRET_KEY);
    req.user = payload;
    // console.log("this is the payload", payload, req.user);
    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.body.user) {
    return next({ status: 401, message: "Unauthorized" });
  } else {
    return next();
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    if (req.body.username === req.params.username) {
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
};

/** Shared config for application; can be req'd many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "test";

const PORT = +process.env.PORT || 3000;

const BCRYPT_WORK_FACTOR = 12;

// database is:
//
// - on Heroku, get from env var DATABASE_URL
// - in testing, 'microblog-test'
// - else: 'microblog'

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "microblog-test";
} else {
  DB_URI = process.env.DATABASE_URL || "microblog";
}

module.exports = {
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
  PORT,
  DB_URI
};

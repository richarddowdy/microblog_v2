/** Database connection for Microblog. */

const { Client } = require("pg");
const { DB_URI } = require("./config");

// const client = new Client(process.env.DATABASE_URL || "postgresql:///microblog");
const db = new Client({
  connectionString: DB_URI,
  ssl: { rejectUnauthorized: false },
});

db.connect();

module.exports = db;

/**
 *
 * CREATE CONFIG FILE SIMILAR TO JOBLY
 *
 * UPDATE INFO HERE AS WELL
 */

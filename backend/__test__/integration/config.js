// npm packages
const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// app imports
const app = require("../../app");
const db = require("../../db");

// global auth variable to store things for all the tests
const TEST_DATA = {};

/**
 * Hooks to insert a user, company, and job, and to authenticate
 *  the user and the company for respective tokens that are stored
 *  in the input `testData` parameter.
 * @param {Object} TEST_DATA - build the TEST_DATA object
 */
async function beforeEachHook(TEST_DATA) {
  try {
    await db.query("DELETE FROM users;");
    await db.query("DELETE FROM posts;");
    await db.query("DELETE FROM comments;");

    // login a user, get a token, store the user ID and token
    const hashedPassword = await bcrypt.hash("secret", 1);
    const userResponse = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email, is_admin)
                  VALUES ('test', $1, 'tester', 'testerino', 'test@test.com', true)
                  RETURNING id`,
      [hashedPassword]
    );

    const response = await request(app).post("/api/login").send({
      username: "test",
      password: "secret",
    });

    TEST_DATA.userToken = response.body.token;
    TEST_DATA.currentUsername = jwt.decode(TEST_DATA.userToken).username;
    TEST_DATA.userId = userResponse.rows[0].id;

    const result = await db.query(
      "INSERT INTO posts (title, description, body, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      ["test", "Great Test", "Do you see what I did there?", TEST_DATA.userId]
    );

    TEST_DATA.currentPost = result.rows[0];

    const newComment = await db.query(
      "INSERT INTO comments (text, post_id, user_id) VALUES ('First Comment', $1, $2) RETURNING *",
      [TEST_DATA.currentPost.id, TEST_DATA.userId]
    );
    TEST_DATA.commentId = newComment.rows[0].id;
    console.log("CREATED TEST DATA", TEST_DATA);
  } catch (error) {
    console.error(error);
  }
}

async function afterEachHook() {
  try {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM posts");
    await db.query("DELETE FROM comments");
  } catch (error) {
    console.error(error);
  }
}

async function afterAllHook() {
  try {
    await db.end();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  afterAllHook,
  afterEachHook,
  TEST_DATA,
  beforeEachHook,
};

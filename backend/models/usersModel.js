const db = require("../db");
const bcrypt = require("bcrypt");
// const partialUpdate = require("../helpers/partialUpdate");
const ExpressError = require("../helpers/expressError");

const BCRYPT_WORK_FACTOR = 10;

/** Related functions for users. */

class User {
  /** Find all users. */

  static async findAll() {
    const result = await db.query(`SELECT id, username, is_admin FROM users ORDER BY id;`);
    return result.rows;
  }

  /** Given a username, return data about user. */

  static async findOne(id) {
    const response = await db.query(
      `SELECT u.id, u.username, u.first_name, u.last_name, u.email
      JSON_AGG(DISTINCT p.id) AS posts,
      JSON_AGG(DISTINCT c.id) AS comments
      FROM users u
      LEFT JOIN posts p ON p.user_id = u.id
      LEFT JOIN comments c ON c.user_id = u.id
      WHERE u.id = $1
      GROUP BY u.id
      ORDER BY u.id`,
      [id]
    );

    const user = response.rows[0];

    if (!user) {
      throw new ExpressError(`There exists no user '${username}'`, 404);
    }

    // TODO: do i still need this?

    // const userJobsRes = await db.query(
    //     `SELECT j.title, j.company_handle, a.state
    //       FROM applications AS a
    //         JOIN jobs AS j ON j.id = a.job_id
    //       WHERE a.username = $1`,
    //     [username]
    //   );

    //   user.jobs = userJobsRes.rows;
    return user;
  }

  /** Register user with data. Returns new user data. */

  static async register(data) {
    const duplicateCheck = await db.query(
      `SELECT username 
        FROM users 
        WHERE username = $1`,
      [data.username]
    );

    if (duplicateCheck.rows[0]) {
      throw new ExpressError(`There already exists a user with username '${data.username}`, 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users 
          (username, password, first_name, last_name, email, photo_url) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING username, password, first_name, last_name, email, photo_url`,
      [data.username, hashedPassword, data.first_name, data.last_name, data.email, data.photo_url]
    );

    return result.rows[0];
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Return data for changed user.
   *
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }
    // TODO: data here is probably the fields that are being updated
    let { query, values } = partialUpdate("users", data, "username", username);

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`There is no user '${username}'`, 404);
    }

    delete user.password;
    delete user.is_admin;

    return result.rows[0]; // TODO: should this be user instead?
  }

  /** Delete given user from database; returns undefined. */

  static async delete(id) {
    let result = await db.query(
      `DELETE FROM users 
        WHERE username = $1
        RETURNING username`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`There is no user '${username}'`, 404);
    }
    return result.rows[0].username;
  }

  /** Authenticate user with username, password. Returns user or throws err. */

  static async authenticate(data) {
    // try to find the user first
    const result = await db.query(
      `SELECT id,
              username, 
              password, 
              is_admin
        FROM users 
        WHERE username = $1`,
      [data.username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new ExpressError("Invalid Username or Password", 401);
  }

  /**  Checks if users is an admin - returns boolean */

  static async adminStatus(username) {
    try {
      const result = await db.query(
        `SELECT is_admin
        FROM users
        WHERE username = $1`,
        [username]
      );
      const adminStatus = result.rows[0].is_admin;
      return adminStatus;
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = User;

// static async register(data) {
//   const duplicateCheck = await db.query(
//     `SELECT username
//       FROM users
//       WHERE username = $1`,
//     [data.username]
//   );

//   if (duplicateCheck.rows[0]) {
//     throw new ExpressError(
//       `There already exists a user with username '${data.username}`,
//       400
//     );
//   }

//   const hashedPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);

//   const result = await db.query(
//     `INSERT INTO users
//         (username, password, first_name, last_name, email, photo_url)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING username, password, first_name, last_name, email, photo_url`,
//     [
//       data.username,
//       hashedPassword,
//       data.first_name,
//       data.last_name,
//       data.email,
//       data.photo_url
//     ]
//   );

//   return result.rows[0];
// }

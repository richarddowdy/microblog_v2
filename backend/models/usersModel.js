const db = require("../db");
const bcrypt = require("bcrypt");
const partialUpdate = require("../helpers/partialUpdate");
const ExpressError = require("../helpers/expressError");
const jsonscema = require("jsonschema");
const userSchema = require("../schema/userSchema.json");
const jwt = require("jsonwebtoken");

const BCRYPT_WORK_FACTOR = 10;
const { SECRET_KEY } = require("../config");

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
      `SELECT username, first_name, last_name, email, is_admin
      FROM users 
      WHERE id = $1`,
      [id]
    );
    const user = response.rows[0];
    if (!user) {
      throw new ExpressError(`There is no user '${username}'`, 404);
    }
    return user;
  }

  /** Register user with data. Returns new user data. */

  static async register(data) {
    let result = jsonscema.validate(data, userSchema);
    if (!result.valid) {
      let listOfErrors = result.errors.map((error) => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      return next(error);
    }

    const { username, password } = data;
    if (password.length <= 6) {
      throw new ExpressError("Password must be at least 6 characters long.");
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    let user;

    try {
      const userResult = await db.query(
        `INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING id, username, is_admin`,
        [username, hashedPassword]
      );
      user = userResult.rows[0];
    } catch {
      throw new ExpressError("Sorry, that username is already taken.", 400);
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin,
      },
      SECRET_KEY
    );
    return { token, user };
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
  } //TODO fix comment

  /** Change password, requires current password; return undefined */ static async updatePassword(data) {
    const { userId, currentPassword, newPassword } = data;

    if (newPassword.length <= 6) {
      throw new ExpressError("Password must be at least 6 characters long.");
    }
    let passwordHashInDB = await db.query("SELECT password FROM users WHERE id=$1", [userId]);
    passwordHashInDB = passwordHashInDB.rows[0].password;
    if (passwordHashInDB) {
      const isValid = await bcrypt.compare(currentPassword, passwordHashInDB);
      if (isValid) {
        const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_WORK_FACTOR);
        let result = await db.query(`UPDATE users SET password=$1 WHERE id = $2 returning password`, [
          hashedPassword,
          userId,
        ]);
        if (result.rows.length === 0) {
          throw new ExpressError("Unable to update password.");
        }
        return true;
      }
    }
    throw new ExpressError("Current password is incorrect, aborting.", 401);
  }

  /** Delete given user from database; returns username. */

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

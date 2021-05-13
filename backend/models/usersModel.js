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
      `SELECT username, first_name, last_name, email
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
      throw error;
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

  static async update(data) {
    let dbFriendlyData = {
      id: data.userId,
      username: data.username,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
    };

    let { query, values } = partialUpdate("users", dbFriendlyData, "id", data.userId);

    const result = await db.query(query, values);
    const user = result.rows[0];

    if (!user) {
      throw new ExpressError(`There is no user '${username}'`, 404);
    }

    delete user.password;
    delete user.is_admin;

    return user;
  }

  //TODO fix comment
  /** Change password, requires current password; return undefined */
  static async updatePassword(data, userId) {
    const { currentPassword, newPassword, repeatNewPassword } = data;
    if (newPassword !== repeatNewPassword) {
      throw new ExpressError("New passwords must match each other.");
    }

    if (newPassword.length <= 6) {
      throw new ExpressError("Password must be at least 6 characters long.");
    }
    let pwLookup = await db.query(`SELECT password FROM users WHERE id=$1`, [userId]);
    const passwordHashInDB = pwLookup.rows[0].password;
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

  static async delete(data) {
    const { userId, username, password } = data;
    if (username === "adminUser") {
      // Prevent someone from deleting my admin account
      throw new ExpressError("Cannot delete that admin account");
    }

    const result1 = await db.query(`SELECT username, password FROM users WHERE id = $1`, [userId]);
    let user = result1.rows[0];
    if (!user) {
      throw new ExpressError("No such user.", 404);
    }
    const passwordHashInDB = user.password;
    const isValid = await bcrypt.compare(password, passwordHashInDB);
    if (!isValid) {
      throw new ExpressError("Wrong username or password", 401);
    }

    let result2 = await db.query(
      `DELETE FROM users 
        WHERE username = $1
        RETURNING username`,
      [username]
    );

    if (result2.rows.length === 0) {
      throw new ExpressError(`There is no user '${username}'`, 404);
    }
    return result2.rows[0].username;
  }

  /** Authenticate user with username, password. Returns user or throws err. */

  static async login(data) {
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

  /** Takes in the jwt from frontend, decodes it and returns current user */

  static async authenticate(token) {
    const decoded = jwt.decode(token);
    const result = await db.query(
      `SELECT id, username, is_admin 
        FROM users 
        WHERE username = $1`,
      [decoded.username]
    );
    let currentUser = result.rows[0];
    return currentUser;
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

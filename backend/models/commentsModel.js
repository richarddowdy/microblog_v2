const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Comments {
  static async findAll() {}

  static async createComment() {}

  static async updateComment() {}

  static async delete(id) {
    await db.query("DELETE FROM comments WHERE id=$1", [id]);
    return "deleted";
  }
}

module.exports = Comments;

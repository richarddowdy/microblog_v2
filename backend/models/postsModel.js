const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Post {
  static async findAll() {}

  static async findOne() {}

  static async createPost() {}

  static async updatePost() {}

  static async deletePost(id) {
    try {
      await db.query("DELETE FROM posts WHERE id = $1", [id]);
      return "deleted";
    } catch (err) {
      throw new ExpressError();
    }
  }

  static async sendVote() {}
}

module.exports = Post;

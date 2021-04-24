const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Post {
  static async findAll() {}

  static async findOne() {}

  static async createPost() {}

  static async updatePost(id, title, body, description) {
    const result = await db.query(
      `UPDATE posts SET title=$1, description=$2, body=$3
        WHERE id = $4 
        RETURNING id, title, description, body, votes`,
      [title, description, body, id]
    );
    console.log(result.rows[0]);
    return result.rows[0];
  }

  static async deletePost(id) {
    await db.query("DELETE FROM posts WHERE id = $1", [id]);
    return "deleted";
  }

  static async sendVote() {}
}

module.exports = Post;

const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Post {
  static async findAll() {}

  static async findOne() {}

  static async createPost({ title, body, description, userId }) {
    const result = await db.query(
      `INSERT INTO posts (title, description, body, user_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, title, description, body, votes, user_id`,
      [title, description, body, userId]
    );

    if (!result.rows[0]) throw new ExpressError("Unable to create new post. Please refresh and try again.", 500);

    let username = await db.query(`SELECT username FROM users u WHERE u.id = $1`, [userId]);
    username = username.rows[0];
    return { ...result.rows[0], ...username };
  }

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

  static async sendVote(delta, id) {
    const result = await db.query("UPDATE posts SET votes=votes + $1 WHERE id = $2 RETURNING votes", [delta, id]);
    return result.rows[0];
  }
}

module.exports = Post;

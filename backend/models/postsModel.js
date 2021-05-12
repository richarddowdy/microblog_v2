const db = require("../db");
const ExpressError = require("../helpers/expressError");

class Post {
  static async findAll() {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
              p.votes,
              p.user_id,
              u.username
      FROM posts p 
      JOIN users u ON p.user_id = u.id
      ORDER BY p.id
      `
    );
    return result.rows;
  }

  static async findOne(id) {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
              p.body,
              p.votes,
              p.user_id,
              u.username,
              CASE WHEN COUNT(c.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
                    JSON_BUILD_OBJECT('id', c.id, 'text', c.text, 'author', a.username)
                ) END AS comments
      FROM posts p 
      LEFT JOIN comments c ON p.id = c.post_id
      JOIN users u ON p.user_id = u.id
      LEFT JOIN users a ON a.id = c.user_id 
      WHERE p.id = $1
      GROUP BY p.id, u.username
      ORDER BY p.id;
      `,
      [id]
    );
    return result.rows[0];
  }

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

const db = require("../db");
const ExpressError = require("../helpers/expressError");
const jsonscema = require("jsonschema");
const commentSchema = require("../schema/commentSchema.json");

class Comment {
  static async findAll() {
    const result = await db.query("SELECT id, text FROM comments WHERE post_id = $1 ORDER BY id", [req.params.post_id]);
    return result.rows;
  }

  static async createComment(data) {
    const { text, postId, userId } = data;
    data.postId = +postId;
    data.userId = +userId;
    const schemaResult = jsonscema.validate(data, commentSchema);
    if (!schemaResult.valid) {
      let listOfErrors = schemaResult.errors.map((error) => error.stack);
      let error = new ExpressError(listOfErrors, 400);
      throw error;
    }

    const result = await db.query(
      `INSERT INTO comments (text, post_id, user_id) VALUES ($1, $2, $3) 
        RETURNING id, text`,
      [text, postId, userId]
    );
    return result.rows[0];
  }

  static async updateComment(text, id) {
    const result = await db.query("UPDATE comments SET text=$1 WHERE id = $2 RETURNING id, text", [text, id]);
    return result.rows[0];
  }

  static async delete(id) {
    await db.query("DELETE FROM comments WHERE id=$1", [id]);
    return "deleted";
  }
}

module.exports = Comment;

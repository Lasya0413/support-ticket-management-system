const db = require("../config/db");

// GET COMMENTS
const getComments = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT
        ticket_comments.id,
        ticket_comments.comment,
        users.name AS user_name
       FROM ticket_comments
       JOIN users
         ON ticket_comments.user_id = users.id
       WHERE ticket_comments.ticket_id = ?
       ORDER BY ticket_comments.created_at ASC`,
      [id]
    );

    res.json(rows);

  } catch (error) {
    next(error);
  }
};


// CREATE COMMENT
const createComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const [result] = await db.execute(
      `INSERT INTO ticket_comments
       (ticket_id, user_id, comment)
       VALUES (?, ?, ?)`,
      [id, req.user.id, comment]
    );

    res.status(201).json({
      message: "Comment added",
      commentId: result.insertId
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getComments,
  createComment
};
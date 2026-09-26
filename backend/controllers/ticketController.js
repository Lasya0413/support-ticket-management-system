const db = require("../config/db");


// GET ALL TICKETS
const getTickets = async (req, res, next) => {
  try {
    let query;
    let values = [];

    if (req.user.role === "agent") {
      query = `
        SELECT
          tickets.id,
          tickets.subject,
          tickets.description,
          tickets.status,
          tickets.priority,
          tickets.user_id,
          users.name AS user_name
        FROM tickets
        JOIN users
          ON tickets.user_id = users.id
        ORDER BY tickets.created_at DESC
      `;
    } else {
      query = `
        SELECT
          tickets.id,
          tickets.subject,
          tickets.description,
          tickets.status,
          tickets.priority,
          tickets.user_id,
          users.name AS user_name
        FROM tickets
        JOIN users
          ON tickets.user_id = users.id
        WHERE tickets.user_id = ?
        ORDER BY tickets.created_at DESC
      `;

      values = [req.user.id];
    }

    const [rows] = await db.execute(query, values);

    res.json(rows);

  } catch (error) {
    next(error);
  }
};


// GET ONE TICKET
const getTicketById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      `SELECT
        tickets.id,
        tickets.subject,
        tickets.description,
        tickets.status,
        tickets.priority,
        tickets.user_id,
        users.name AS user_name
       FROM tickets
       JOIN users
         ON tickets.user_id = users.id
       WHERE tickets.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    const ticket = rows[0];

    if (
      req.user.role === "customer" &&
      ticket.user_id !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to access this ticket"
      });
    }

    res.json(ticket);

  } catch (error) {
    next(error);
  }
};


// CREATE TICKET
const createTicket = async (req, res, next) => {
  try {
    const {
      subject,
      description,
      priority
    } = req.body;

    const [result] = await db.execute(
      `INSERT INTO tickets
       (user_id, subject, description, priority)
       VALUES (?, ?, ?, ?)`,
      [
        req.user.id,
        subject,
        description,
        priority || "medium"
      ]
    );

    res.status(201).json({
      message: "Ticket created",
      ticketId: result.insertId
    });

  } catch (error) {
    next(error);
  }
};


// UPDATE TICKET
// UPDATE TICKET
const updateTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      subject,
      description,
      priority,
      status,
      assigned_to
    } = req.body;

    const [existingTickets] = await db.execute(
      "SELECT * FROM tickets WHERE id = ?",
      [id]
    );

    if (existingTickets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    const existingTicket = existingTickets[0];

    // Validate assigned agent only when assigned_to is provided
    if (assigned_to !== undefined) {
      const [agents] = await db.execute(
        `SELECT id
         FROM users
         WHERE id = ?
         AND role = 'agent'`,
        [assigned_to]
      );

      if (agents.length === 0) {
        return res.status(400).json({
          message: "assigned_to must be a valid agent"
        });
      }
    }

    const updatedSubject =
      subject !== undefined
        ? subject
        : existingTicket.subject;

    const updatedDescription =
      description !== undefined
        ? description
        : existingTicket.description;

    const updatedPriority =
      priority !== undefined
        ? priority
        : existingTicket.priority;

    const updatedStatus =
      status !== undefined
        ? status
        : existingTicket.status;

    const updatedAssignedTo =
      assigned_to !== undefined
        ? assigned_to
        : existingTicket.assigned_to;

    await db.execute(
      `
      UPDATE tickets
      SET
        subject = ?,
        description = ?,
        priority = ?,
        status = ?,
        assigned_to = ?
      WHERE id = ?
      `,
      [
        updatedSubject,
        updatedDescription,
        updatedPriority,
        updatedStatus,
        updatedAssignedTo,
        id
      ]
    );

    res.json({
      success: true,
      message: "Ticket updated successfully"
    });

  } catch (error) {
    next(error);
  }
};

// DELETE TICKET
const deleteTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM tickets WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    res.json({
      success: true,
      message: "Ticket deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};
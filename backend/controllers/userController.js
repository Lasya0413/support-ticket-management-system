const db = require("../config/db");

const getUsers = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC"
    );

    res.json({
      success: true,
      users: rows
    });
  } catch (error) {
    next(error);
  }
};

const getAgents = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, role FROM users WHERE role = ? ORDER BY name",
      ["agent"]
    );

    res.json({
      success: true,
      agents: rows
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getAgents
};
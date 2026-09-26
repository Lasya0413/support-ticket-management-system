const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getUsers,
  getAgents
} = require("../controllers/userController");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("agent"),
  getUsers
);

router.get(
  "/agents",
  authMiddleware,
  authorizeRoles("agent"),
  getAgents
);

module.exports = router;
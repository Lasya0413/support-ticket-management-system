const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require("../controllers/ticketController");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getTickets
);

router.post(
  "/",
  authMiddleware,
  authorizeRoles("customer"),
  createTicket
);

router.get(
  "/:id",
  authMiddleware,
  getTicketById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("agent"),
  updateTicket
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("agent"),
  deleteTicket
);

module.exports = router;
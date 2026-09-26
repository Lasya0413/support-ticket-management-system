const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getComments,
  createComment
} = require("../controllers/commentController");

const router = express.Router();

router.get(
  "/:id/comments",
  authMiddleware,
  getComments
);

router.post(
  "/:id/comments",
  authMiddleware,
  createComment
);

module.exports = router;
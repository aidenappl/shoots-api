const express = require("express");
const router = express.Router();
const db = require("../db");
const Responder = require("../middleware/responder");

// Get current user
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    Responder.success(res, "Users fetched successfully", result.rows);
  } catch (err) {
    console.log(err);
    Responder.error(res, "An error occurred while fetching users", err);
  }
});

// Get user by ID
router.get("/:id", (req, res) => {
  res.send("this is user route for ID: " + req.params.id);
});

module.exports = router;

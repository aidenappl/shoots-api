const express = require("express");
const router = express.Router();
const db = require("../db");

// Get current user
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
  // res.send("this is user route");
});

// Get user by ID
router.get("/:id", (req, res) => {
  res.send("this is user route for ID: " + req.params.id);
});

module.exports = router;

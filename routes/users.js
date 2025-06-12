const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) return res.status(404).send("User not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
      [name, email, age, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).send("User not found");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).send("User not found");
    res.send("User deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

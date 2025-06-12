const pool = require("./db");

async function createTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        age INTEGER
      );
    `;
    await pool.query(query);
    console.log("✅ 'users' table created successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating table:", err);
    process.exit(1);
  }
}

createTable();

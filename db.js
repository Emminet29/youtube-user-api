// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://admin:rt7UwnzaRoagTltPg2467QXXnRfUIsKY@dpg-d15bgp15pdvs73f4d70g-a.oregon-postgres.render.com/youtube_users',
  ssl: {
    rejectUnauthorized: false // Required for secure connection to Render
  }
});

module.exports = pool;

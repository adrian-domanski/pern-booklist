const { Pool } = require('pg');

const pool = new Pool({
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
});

module.exports = pool;

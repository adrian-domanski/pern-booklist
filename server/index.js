const express = require('express');
const pool = require('./db');
const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRouter');
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

const PORT = 5000;

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM books');

  res.json(result.rows);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

const express = require('express');
const pool = require('../db');
const bookRouter = express.Router();

// Get all books
bookRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get specific book
bookRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw Error('No book Id provided!');
    }
    const { rows } = await pool.query('SELECT * FROM books WHERE id = $1', [
      id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    res.send(err.message);
  }
});

// Insert new book
bookRouter.post('/', async (req, res) => {
  try {
    const { title, page_count, author_id } = req.body;

    if (!title || !page_count || !author_id) {
      throw Error('Not all params provided');
    }

    const { rows } = await pool.query(
      'INSERT INTO books (id, title, page_count, author_id) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *',
      [title, page_count, author_id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.send(err.message);
  }
});

// Delete a book
bookRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw Error('No book id provided');
    }

    const { rows } = await pool.query(
      'DELETE FROM books WHERE id = $1 RETURNING *',
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = bookRouter;

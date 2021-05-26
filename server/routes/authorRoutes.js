const express = require('express');
const pool = require('../db');
const authorRouter = express.Router();

// Get all authors
authorRouter.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM authors');
    res.json(rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a specific author by id
authorRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM authors WHERE id = $1', [
      id,
    ]);
    res.json(rows[0]);
  } catch (err) {
    res.send(err.message);
  }
});

// Add new author
authorRouter.post('/', async (req, res) => {
  try {
    const { name, surname } = req.body;

    if (!name || !surname) {
      throw Error('Provide all data!');
    }

    const { rows } = await pool.query(
      'INSERT INTO authors (id, name, surname) VALUES (uuid_generate_v4(), $1, $2) RETURNING *',
      [name, surname]
    );

    res.json(rows[0]);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = authorRouter;

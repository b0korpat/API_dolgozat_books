import express from 'express'
import { dbQuery, dbRun }from '../database.js';

const router = express.Router();

router.get('/', (req, res) => {
  dbQuery('SELECT * FROM books')
    .then(rows => {
      res.json({ books: rows });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  dbQuery('SELECT * FROM books WHERE id = ?', [id])
    .then(row => {
      res.json({ books: row });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const year = req.body.year;
  dbRun(
    'INSERT INTO books (title, author, description, year) VALUES (?, ?, ?, ?)',
    [title, author, description, year]
  )
    .then(result => {
      res.status(201).json({ id: result.lastID });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  const year = req.body.year;
  dbRun(
    'UPDATE books SET title = ?, author = ?, description = ?, year = ? WHERE id = ?',
    [title, author, description, year, id]
  )
    .then(result => {
      res.json({ updated: result.changes });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  dbRun('DELETE FROM books WHERE id = ?', [id])
    .then(result => {
      res.json({ deleted: result.changes });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});
export default router;

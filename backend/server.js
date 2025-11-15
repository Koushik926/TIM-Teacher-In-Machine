// backend/server.js

const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const DB_PATH = path.join(__dirname, '../tim.db');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite DB
const db = new sqlite3.Database(DB_PATH);

// GET /api/units
app.get('/api/units', (req, res) => {
  db.all("SELECT * FROM units", [], (err, rows) => {
    if (err) return res.status(500).send({ error: err });
    res.send(rows);
  });
});

// GET /api/units/:id/passages
app.get('/api/units/:id/passages', (req, res) => {
  db.all("SELECT * FROM passages WHERE unit_id=?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).send({ error: err });
    res.send(rows);
  });
});

// GET /api/units/:id/questions
app.get('/api/units/:id/questions', (req, res) => {
  db.all("SELECT * FROM questions WHERE unit_id=?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).send({ error: err });
    res.send(rows);
  });
});

// POST /api/attempts
app.post('/api/attempts', (req, res) => {
  const { user_id, question_id, response_text, is_correct, score, eval_details } = req.body;
  db.run(
    `INSERT INTO attempts (user_id, question_id, response_text, is_correct, score, eval_details) VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, question_id, response_text, is_correct, score, eval_details],
    function(err) {
      if (err) return res.status(500).send({ error: err });
      res.send({ attempt_id: this.lastID });
    }
  );
});

app.listen(PORT, () => {
  console.log(`TIM Backend running on port ${PORT}`);
});

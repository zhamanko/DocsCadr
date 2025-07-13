import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/positions', (req, res) => {
  db.all('SELECT * FROM positions', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/positions', (req, res) => {
  const { position, section, unit } = req.body;
  if (!position || !section) {
    return res.status(400).json({ error: 'position and section are required' });
  }

  db.run(
    'INSERT INTO positions (position, section, unit) VALUES (?, ?, ?)',
    [position, section, unit || null],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

export default router;

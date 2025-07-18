import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/free-positions', (req, res) => {
  const query = `
    SELECT 
    p.id,
    p.position,
    p.rate_totale,
    ROUND(p.rate_totale - IFNULL(SUM(
    CASE 
      WHEN ep.ZSU = '1' OR ep.end_date IS NOT NULL THEN 0
      ELSE ep.rate
    END
    ), 0), 2) AS free_rate
    FROM positions p
    LEFT JOIN employee_positions ep ON p.id = ep.position_id
    GROUP BY p.id
    HAVING free_rate > 0
  `;

  db.all(query, [], (err, rows) => {
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
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

export default router;

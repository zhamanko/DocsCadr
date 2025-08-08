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

router.put('/positions/:id', (req, res) => {
  const { id } = req.params;
  const { position, section, unit, rate_totale, free_rate } = req.body;

  if (!position || !section) {
    return res.status(400).json({ error: 'position та section є обовʼязковими' });
  }

  const query = `
    UPDATE positions
    SET position = ?, 
        section = ?, 
        unit = ?, 
        rate_totale = ?
    WHERE id = ?
  `;

  db.run(
    query,
    [position, section, unit || null, rate_totale || 0, id],
    function (err) {
      if (err) {
        console.error('Помилка оновлення позиції:', err.message);
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Позиція не знайдена' });
      }
      res.json({ success: true, updated: this.changes });
    }
  );
});

router.get('/positions', (req, res) => {
  const search = `%${req.query.search || ''}%`;

  const allowedSortFields = {
    id: 'p.id',
    position: 'p.position',
    section: 'p.section',
    rate_totale: 'p.rate_totale',
    free_rate: 'free_rate',
    unit: 'p.unit'
  };

  const sortField = allowedSortFields[req.query.sort_by] || 'p.position';
  const sortOrder = req.query.sort_order === 'desc' ? 'DESC' : 'ASC';

  console.log(`Sorting by: ${sortField} ${sortOrder}`);

  const query = `
  SELECT 
    p.id,
    p.position,
    p.section,
    p.rate_totale,
    p.unit,
    ROUND(p.rate_totale - IFNULL(SUM(
      CASE 
        WHEN ep.ZSU = '1' OR ep.end_date IS NOT NULL THEN 0
        ELSE ep.rate
      END
    ), 0), 2) AS free_rate
  FROM positions p
  LEFT JOIN employee_positions ep ON p.id = ep.position_id
  GROUP BY p.id
  HAVING (
    p.position LIKE ? OR
    p.section LIKE ? OR
    p.rate_totale LIKE ? OR
    free_rate LIKE ? OR
    p.unit LIKE ?
  )
  ORDER BY ${sortField} ${sortOrder}
`;

  db.all(query, [search, search, search, search, search], (err, rows) => {
    if (err) {
      console.error('SQL error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

export default router;

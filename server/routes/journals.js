import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/journals', (req, res) => {
  const search = `%${req.query.search || ''}%`;

  const allowedSortFields = {
    id: 'j.id',
    name: 'j.name',
    date: 'j.date',
    file: 'j.file'
  };

  const sortField = allowedSortFields[req.query.sort_by] || 'j.name';
  const sortOrder = req.query.sort_order === 'desc' ? 'DESC' : 'ASC';

  console.log(`Sorting by: ${sortField} ${sortOrder}`);

  const query = `
    SELECT 
      j.id,
      j.number,
      j.name,
      j.date,
      j.file
    FROM journals j
    WHERE 
     ( 
        j.name LIKE ? OR
        j.number LIKE ? OR
        j.date LIKE ? OR
        j.file LIKE ?
      )
      AND j.flag = 1
    ORDER BY ${sortField} ${sortOrder}
  `;

  db.all(query, [search, search, search, search], (err, rows) => {
    if (err) {
      console.error('SQL error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

export default router;

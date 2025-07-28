import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/templates', (req, res) => {
  const search = `%${req.query.search || ''}%`;

  const allowedSortFields = {
    id: 't.id',
    type: 't.type',
    name: 't.name',
    addition: 't.addition',
    file: 't.file'
  };

  const sortField = allowedSortFields[req.query.sort_by] || 't.name';
  const sortOrder = req.query.sort_order === 'desc' ? 'DESC' : 'ASC';

  console.log(`Sorting by: ${sortField} ${sortOrder}`);

  const query = `
    SELECT 
      t.id,
      t.type,
      t.name,
      t.addition,
      t.file
    FROM templates t
    WHERE 
     ( 
        t.name LIKE ? OR
        t.type LIKE ? OR
        t.addition LIKE ? OR
        t.file LIKE ?
      )
      AND t.flag = 1
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

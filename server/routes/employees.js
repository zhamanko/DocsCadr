import { Router } from 'express';
import db from '../db.js';

const router = Router();

router.get('/employees-full', (req, res) => {
    const search = `%${req.query.search || ''}%`;

    const allowedSortFields = {
        id: 'ep.id',
        full_name: 'e.full_name',
        position: 'p.position',
        work_type: 'ep.note',
        start_date: 'ep.start_date',
        invalidity: 'e.Invalidity',
        ZSU: 'ep.ZSU',
        VBO: 'e.VBO'
    };

    const sortField = allowedSortFields[req.query.sort_by] || 'e.full_name';
    const sortOrder = req.query.sort_order === 'desc' ? 'DESC' : 'ASC';

    const query = `
    SELECT 
      ep.id AS id,
      e.full_name,
      p.position  AS position,
      ep.start_date,
      e.Invalidity,
      ep.ZSU,
      ep.note AS work_type,
      e.VBO
    FROM employee_positions ep
    JOIN employees e ON ep.employee_id = e.id
    JOIN positions p ON ep.position_id = p.id
    WHERE e.full_name LIKE ?
      OR p.position  LIKE ?
      OR ep.note LIKE ?
      OR e.VBO LIKE ?
      OR ep.ZSU LIKE ?
      OR e.Invalidity LIKE ?
    ORDER BY ${sortField} ${sortOrder}
  `;

    db.all(query, [search, search, search, search, search, search], (err, rows) => {
        if (err) {
            console.error('SQL error:', err.message); 
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

export default router;

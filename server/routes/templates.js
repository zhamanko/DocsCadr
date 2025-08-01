import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import db from '../db.js';

const router = Router();
const templatesDir = path.join(process.env.USER_DATA_PATH, 'templates');

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

  const typeFilter = req.query.type;
  const additionFilter = req.query.addition;

  let query = `
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
  `;

  const params = [search, search, search, search];

  if (typeFilter) {
    query += ` AND t.type = ?`;
    params.push(typeFilter);
  }

  if (additionFilter) {
    query += ` AND t.addition = ?`;
    params.push(additionFilter);
  }

  query += ` AND t.flag = 1 ORDER BY ${sortField} ${sortOrder}`;

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('SQL error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.post('/templates-add', (req, res) => {
  const { type, name, addition, file, fileBuffer } = req.body;
  if (!filename || !fileBuffer) return res.status(400).send('Missing data');

  const filePath = path.join(templatesDir, filename);
  fs.writeFileSync(filePath, Buffer.from(fileBuffer, 'base64'));

  db.run(
    `INSERT INTO templates (type, name, addition, file) VALUES (?, ?, ?, ?)`,
    [type, name, addition, file],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }
  );
});

export default router;

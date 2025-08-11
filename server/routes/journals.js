import { Router } from 'express';
import db from '../db.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import iconv from 'iconv-lite';

const journalsDir = path.join(process.env.USER_DATA_PATH, 'journals');

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

if (!fs.existsSync(journalsDir)) {
    fs.mkdirSync(journalsDir, { recursive: true });
}

// Налаштування multer для збереження в journalsDir
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, journalsDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });


router.post('/journals', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Файл не передано' });
    }

    // Примусове перетворення у UTF-8
    let originalname = req.file.originalname;
    if (!Buffer.isBuffer(originalname)) {
        // multer віддає як string у UTF-8, але якщо воно вже зіпсоване — пробуємо конвертувати
        originalname = iconv.decode(Buffer.from(originalname, 'binary'), 'utf8');
    }

    const { number, date } = req.body;

    db.run(`
        INSERT INTO journals (number, name, date, file, flag)
        VALUES (?, ?, ?, ?, 1)
    `, [number, originalname, date, originalname], function (err) {
        if (err) {
            console.error('SQL error:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, id: this.lastID });
    });
});

export default router;

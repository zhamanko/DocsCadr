import express from 'express';
import cors from 'cors';
import path from 'path';
import models from './models/index.js';
import documentsRouter from './routes/documents.js';
import positionRouter from './routes/positions.js';
import db from './db.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve('server/files')));

app.use('/api', documentsRouter);
app.use('/api', positionRouter);

// app.get('/api/employees-full', (req, res) => {
//   const search = `%${req.query.search || ''}%`
//   const sortBy = req.query.sort_by || 'e.full_name'
//   const sortOrder = req.query.sort_order === 'desc' ? 'DESC' : 'ASC'

//   const query = `
//     SELECT 
//       ep.id AS id,
//       e.full_name,
//       p.name AS position,
//       ep.start_date,
//       e.Invalidity,
//       ep.ZSU,
//       ep.note AS work_type,
//       e.VBO
//     FROM employee_positions ep
//     JOIN employees e ON ep.employee_id = e.id
//     JOIN positions p ON ep.position_id = p.id
//     WHERE e.full_name LIKE ?
//       OR p.name LIKE ?
//       OR ep.note LIKE ?
//       OR e.VBO LIKE ?
//       OR ep.ZSU LIKE ?
//       OR e.Invalidity LIKE ?
//     ORDER BY ${sortBy} ${sortOrder}
//   `;

//   db.all(query, [search, search, search, search, search, search], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message })
//     res.json(rows)
//   })
// })

app.listen(PORT, async () => {
    console.log(`Server is running on localhost:${PORT}`);
    await models.initModels();
})
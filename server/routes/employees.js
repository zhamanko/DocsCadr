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
      ep.id,
      ep.employee_id,
      e.full_name,
      p.position  AS position,
      ep.start_date,
      e.invalidity,
      ep.ZSU,
      ep.rate,
      ep.note AS work_type,
      e.VBO,
      ep.bonus_percent
    FROM employee_positions ep
    JOIN employees e ON ep.employee_id = e.id
    JOIN positions p ON ep.position_id = p.id
    WHERE 
     ( 
        e.full_name LIKE ?
        OR p.position  LIKE ?
        OR ep.note LIKE ?
        OR e.VBO LIKE ?
        OR ep.ZSU LIKE ?
        OR e.invalidity LIKE ?
      )
      AND ep.end_date IS NULL
      AND ep.ZSU IS NULL
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

router.post('/employees-smart', (req, res) => {
  const {
    full_name,
    VBO,
    invalidity,
    position_id,
    rate,
    bonus_percent,
    note,
    start_date
  } = req.body;

  const isId = Number.isInteger(full_name); // якщо це ID

  const createPositionRecord = (employeeId) => {
    const insertPosition = `
      INSERT INTO employee_positions (
        employee_id,
        position_id,
        rate,
        bonus_percent,
        note,
        start_date
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(insertPosition, [employeeId, position_id, rate, bonus_percent, note, start_date], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, employee_id: employeeId });
    });
  };

  if (isId) {
    // Вже існуючий працівник — просто додаємо позицію
    createPositionRecord(full_name);
  } else {
    // Новий працівник
    const insertEmployee = `
      INSERT INTO employees (full_name, VBO, Invalidity)
      VALUES (?, ?, ?)
    `;
    db.run(insertEmployee, [full_name, VBO, invalidity], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      const employeeId = this.lastID;
      createPositionRecord(employeeId);
    });
  }
});

router.post('/employees-update', (req, res) => {
  const {
    full_name,
    VBO,
    invalidity,
    position,
    rate,
    bonus_percent,
    note,
    start_date,
    ZSU,
  } = req.body;

  const findPositionQuery = `SELECT id FROM positions WHERE position = ? LIMIT 1`;

  db.get(findPositionQuery, [position], (err, positionRow) => {
    if (err) {
      console.error('Error fetching position:', err.message);
      return res.status(500).json({ error: 'Помилка на сервері' });
    }

    if (!positionRow) {
      return res.status(400).json({ error: 'Посада не знайдена' });
    }

    const position_id = positionRow.id;

    const findEmployeeQuery = `SELECT id FROM employees WHERE full_name = ? LIMIT 1`;

    db.get(findEmployeeQuery, [full_name], (err, employeeRow) => {
      if (err) {
        console.error('Error fetching employee:', err.message);
        return res.status(500).json({ error: 'Помилка на сервері' });
      }

      if (!employeeRow) {
        return res.status(400).json({ error: 'Працівник не знайдений' });
      }

      const employee_id = employeeRow.id;

      const updateEmployeeQuery = `
        UPDATE employees
        SET VBO = ?, invalidity = ?
        WHERE id = ?
      `;

      db.run(updateEmployeeQuery, [VBO, invalidity, employee_id], function (err) {
        if (err) {
          console.error('Error updating employee:', err.message);
          return res.status(500).json({ error: 'Помилка оновлення працівника' });
        }

        const updatePositionQuery = `
          UPDATE employee_positions
          SET
            position_id = ?,
            rate = ?,
            bonus_percent = ?,
            note = ?,
            start_date = ?,
            ZSU = ?
          WHERE employee_id = ? AND end_date IS NULL
        `;

        db.run(updatePositionQuery, [
          position_id,
          rate,
          bonus_percent,
          note,
          start_date,
          ZSU,
          employee_id
        ], function (err) {
          if (err) {
            console.error('Error updating employee position:', err.message);
            return res.status(500).json({ error: 'Помилка оновлення позиції працівника' });
          }

          return res.json({ success: true, message: 'Дані успішно оновлені' });
        });
      });
    });
  });
});

router.post('/employees-release', (req, res) => {
  const {
    id,
    end_date
  } = req.body;

  const updatePositionQuery = `
          UPDATE employee_positions
          SET
            end_date = ?
          WHERE id = ? AND end_date IS NULL
        `;

  db.run(updatePositionQuery, [
    end_date,
    id
  ], function (err) {
    if (err) {
      console.error('Error updating employee position:', err.message);
      return res.status(500).json({ error: 'Помилка оновлення позиції працівника' });
    }

    return res.json({ success: true, message: 'Дані успішно оновлені' });
  });
});


export default router;

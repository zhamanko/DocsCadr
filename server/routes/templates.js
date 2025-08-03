import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import db from '../db.js';
import crypto from 'crypto';

const router = Router();

const templatesDir = path.join(process.env.USER_DATA_PATH, 'templates');

if (!fs.existsSync(templatesDir)) fs.mkdirSync(templatesDir, { recursive: true });

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

router.post('/templates-add', async (req, res) => {
  try {
    const { type, name, addition = '', filename, fileBuffer } = req.body;

    // Перевірка обов'язкових полів
    if (!type || !name) {
      return res.status(400).json({ error: "Не вказано тип або назву шаблону" });
    }

    if (!filename || !fileBuffer) {
      return res.status(400).json({ error: "Відсутній файл або дані файлу" });
    }

    // Генеруємо унікальне ім'я файлу
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const ext = path.extname(filename).toLowerCase() || '.docx';
    const uniqueFilename = `${hash}${ext}`;
    const newFilePath = path.join(templatesDir, uniqueFilename);

    // Шукаємо існуючий шаблон
    const existing = await new Promise((resolve, reject) => {
      db.get(
        `SELECT id, file FROM templates WHERE type = ? AND name = ? AND addition = ?`,
        [type, name, addition],
        (err, row) => err ? reject(err) : resolve(row)
      );
    });

    if (existing) {
      // ОНОВЛЕННЯ ІСНУЮЧОГО ШАБЛОНУ
      try {
        // Видаляємо старий файл, якщо він існує
        const oldFilePath = path.join(templatesDir, existing.file);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log(`Старий файл видалено: ${oldFilePath}`);
        }

        // Зберігаємо новий файл
        fs.writeFileSync(newFilePath, Buffer.from(fileBuffer, 'base64'));
        console.log(`Новий файл збережено: ${newFilePath}`);

        // Оновлюємо запис у БД
        await new Promise((resolve, reject) => {
          db.run(
            `UPDATE templates SET file = ? WHERE id = ?`,
            [uniqueFilename, existing.id],
            function(err) {
              if (err) {
                console.error('Помилка оновлення БД:', err);
                // Спроба видалити новий файл, якщо оновлення не вдалося
                if (fs.existsSync(newFilePath)) {
                  fs.unlinkSync(newFilePath);
                }
                reject(err);
              } else {
                console.log(`Шаблон оновлено в БД. ID: ${existing.id}`);
                resolve();
              }
            }
          );
        });

        return res.json({ 
          success: true,
          id: existing.id,
          message: 'Шаблон успішно оновлено',
          filename: uniqueFilename
        });

      } catch (err) {
        console.error('Помилка при оновленні шаблону:', err);
        return res.status(500).json({ 
          error: 'Не вдалося оновити шаблон',
          details: err.message 
        });
      }

    } else {
      // ДОДАВАННЯ НОВОГО ШАБЛОНУ
      try {
        // Зберігаємо файл
        fs.writeFileSync(newFilePath, Buffer.from(fileBuffer, 'base64'));
        console.log(`Новий файл збережено: ${newFilePath}`);

        // Додаємо запис до БД
        const { lastID } = await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO templates (type, name, addition, file) VALUES (?, ?, ?, ?)`,
            [type, name, addition, uniqueFilename],
            function(err) {
              if (err) {
                console.error('Помилка додавання до БД:', err);
                // Видаляємо файл, якщо запис не вдався
                if (fs.existsSync(newFilePath)) {
                  fs.unlinkSync(newFilePath);
                }
                reject(err);
              } else {
                console.log(`Новий шаблон додано. ID: ${this.lastID}`);
                resolve(this);
              }
            }
          );
        });

        return res.json({ 
          success: true,
          id: lastID,
          message: 'Новий шаблон успішно додано',
          filename: uniqueFilename
        });

      } catch (err) {
        console.error('Помилка при додаванні шаблону:', err);
        return res.status(500).json({ 
          error: 'Не вдалося додати шаблон',
          details: err.message 
        });
      }
    }

  } catch (err) {
    console.error('Загальна помилка в /templates-add:', err);
    return res.status(500).json({ 
      error: 'Внутрішня помилка сервера',
      details: err.message 
    });
  }
});



export default router;

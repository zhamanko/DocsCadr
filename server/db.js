// server/db.js
import sqlite3 from 'sqlite3';
import { dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const dbPath = process.env.DB_PATH;
if (!dbPath) throw new Error('❌ DB_PATH не встановлено');

const dir = dirname(dbPath);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('❌ Помилка БД:', err);
  else console.log('✅ Базу відкрито за шляхом:', dbPath);
});

export default db;

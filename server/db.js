// server/db.js
import sqlite3 from 'sqlite3';
import { resolve } from 'path';

const db = new sqlite3.Database(resolve('server/database.sqlite'), (err) => {
  if (err) console.error('DB open error:', err);
});

export default db;

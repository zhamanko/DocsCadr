import db from '../db.js';

function initEmployees() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        VBO TEXT, 
        invalidity TEXT,
        flag INTEGER DEFAULT 1 NOT NULL
      )
    `, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export default {
  initEmployees
};
 
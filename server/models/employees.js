import db from '../db.js';

function initEmployees() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        VBO TEXT, 
        Invalidity TEXT
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
 
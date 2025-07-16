import db from '../db.js';

function initJournals() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS journals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT NOT NULL,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        file TEXT NOT NULL
      )
    `, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export default {
  initJournals
};
 
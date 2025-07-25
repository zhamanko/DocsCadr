import db from '../db.js';

function initJournals() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS journals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT NOT NULL,
        letters_num TEXT NOT NULL,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        file TEXT NOT NULL,
        flag INTEGER DEFAULT 1 NOT NULL
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
 
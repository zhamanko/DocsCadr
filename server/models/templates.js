import db from '../db.js';

function initTemplates() {
  return new Promise((resolve, reject) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        addition TEXT,
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
  initTemplates
};
 
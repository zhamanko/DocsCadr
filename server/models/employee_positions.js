import db from '../db.js';

function initEmployeePositions() {
    return new Promise((resolve, reject) => {
        db.run(`
            CREATE TABLE IF NOT EXISTS employee_positions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER NOT NULL,
            position_id INTEGER NOT NULL,
            rate REAL NOT NULL CHECK (rate > 0 AND rate <= 1),
            bonus_percent REAL DEFAULT 0,
            note TEXT,
            ZSU TEXT,
            start_date TEXT NOT NULL,
            end_date TEXT,
            FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
            FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE CASCADE
      )
    `, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

export default {
    initEmployeePositions
};

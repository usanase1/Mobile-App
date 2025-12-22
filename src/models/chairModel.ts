import db from '../config/database';

export const createChairTable = () => {
    db.run(`
    CREATE TABLE IF NOT EXISTS chairs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER,
        name TEXT,
        quantity INTEGER,
        purchase_date TEXT,
        is_padded INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(room_id) REFERENCES rooms(id)
    )
  `);
};

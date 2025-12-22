import db from '../config/database';

export const createHotelTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      category TEXT,
      price TEXT,
      image TEXT,
      rating REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

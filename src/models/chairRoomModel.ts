import db from '../config/database';

export const createRoomsTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (!err) {
      // Seed data if table created or exists
      const rooms = ['Main Hall', 'Conference Room A', 'Guest Suite 101'];
      rooms.forEach(room => {
        db.run(`INSERT INTO rooms (name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE name = ?)`, [room, room]);
      });
    }
  });
};

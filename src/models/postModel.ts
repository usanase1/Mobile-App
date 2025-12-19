import db from '../config/database';

export const createPostTable = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `, (err: Error | null) => {
        if (err) {
            console.error("Error creating posts table:", err.message);
        } else {
            console.log("Posts table created or already exists");
        }
    });
};

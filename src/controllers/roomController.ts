import { Request, Response } from 'express';
import db from '../config/database';

export const getAllRooms = (req: Request, res: Response) => {
    db.all('SELECT * FROM rooms', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (rows.length === 0) {
            // Auto-seed if empty
            const seedRooms = ['Main Hall', 'Conference Room A', 'Guest Suite 101'];
            const placeholders = seedRooms.map(() => '(?)').join(',');

            db.run(`INSERT INTO rooms (name) VALUES ${placeholders}`, seedRooms, (seedErr) => {
                if (seedErr) {
                    res.status(500).json({ error: seedErr.message });
                    return;
                }
                // Fetch again after seeding
                db.all('SELECT * FROM rooms', [], (retryErr, retryRows) => {
                    if (retryErr) {
                        res.status(500).json({ error: retryErr.message });
                        return;
                    }
                    res.json(retryRows);
                });
            });
        } else {
            res.json(rows);
        }
    });
};

export const createRoom = (req: Request, res: Response) => {
    const { name } = req.body;
    db.run('INSERT INTO rooms (name) VALUES (?)', [name], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name });
    });
};

export const getRoomById = (req: Request, res: Response) => {
    const { id } = req.params;
    db.get('SELECT * FROM rooms WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }
        res.json(row);
    });
};

export const updateRoom = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    db.run('UPDATE rooms SET name = ? WHERE id = ?', [name, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Room updated', changes: this.changes });
    });
};

export const deleteRoom = (req: Request, res: Response) => {
    const { id } = req.params;
    db.run('DELETE FROM rooms WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Room deleted', changes: this.changes });
    });
};

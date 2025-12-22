import { Request, Response } from 'express';
import db from '../config/database';

export const getAllChairs = (req: Request, res: Response) => {
    // Join with rooms to get room name, matching Android logic
    const query = `
        SELECT c.*, r.name as room_name 
        FROM chairs c 
        LEFT JOIN rooms r ON c.room_id = r.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        // Ensure is_padded is returned as boolean for Android
        const mappedRows = (rows as any[]).map(row => ({
            ...row,
            is_padded: !!row.is_padded
        }));
        res.json(mappedRows);
    });
};

export const createChair = (req: Request, res: Response) => {
    console.log('Adding Chair:', req.body);
    const { room_id, name, quantity, purchase_date, is_padded } = req.body;
    const query = `INSERT INTO chairs (room_id, name, quantity, purchase_date, is_padded) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [room_id, name, quantity, purchase_date, is_padded ? 1 : 0], function (err) {
        if (err) {
            console.error('Database Error:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            room_id,
            name,
            quantity,
            purchase_date,
            is_padded: !!is_padded
        });
    });
};

export const getChairById = (req: Request, res: Response) => {
    const { id } = req.params;
    const query = `
        SELECT c.*, r.name as room_name 
        FROM chairs c 
        LEFT JOIN rooms r ON c.room_id = r.id
        WHERE c.id = ?
    `;
    db.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Chair not found' });
            return;
        }
        res.json({
            ...(row as any),
            is_padded: !!(row as any).is_padded
        });
    });
};

export const updateChair = (req: Request, res: Response) => {
    const { id } = req.params;
    const { room_id, name, quantity, purchase_date, is_padded } = req.body;
    const query = `
        UPDATE chairs 
        SET room_id = ?, name = ?, quantity = ?, purchase_date = ?, is_padded = ? 
        WHERE id = ?
    `;
    db.run(query, [room_id, name, quantity, purchase_date, is_padded ? 1 : 0, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Chair updated', changes: this.changes });
    });
};

export const deleteChair = (req: Request, res: Response) => {
    const { id } = req.params;
    db.run('DELETE FROM chairs WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Deleted', changes: this.changes });
    });
};

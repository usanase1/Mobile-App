import { Request, Response } from 'express';
import db from '../config/database';

export const getAllHotels = (req: Request, res: Response) => {
    db.all('SELECT * FROM hotels', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

export const getHotelById = (req: Request, res: Response) => {
    const { id } = req.params;
    db.get('SELECT * FROM hotels WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Hotel not found' });
            return;
        }
        res.json(row);
    });
};

export const createHotel = (req: Request, res: Response) => {
    const { name, address, category, price, image } = req.body;
    const query = `INSERT INTO hotels (name, address, category, price, image) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [name, address, category, price, image], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, address, category, price, image });
    });
};

export const updateHotel = (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, address, category, price, image } = req.body;
    const query = `
        UPDATE hotels 
        SET name = ?, address = ?, category = ?, price = ?, image = ? 
        WHERE id = ?
    `;
    db.run(query, [name, address, category, price, image, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Hotel updated', changes: this.changes });
    });
};

export const deleteHotel = (req: Request, res: Response) => {
    const { id } = req.params;
    db.run('DELETE FROM hotels WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Hotel deleted', changes: this.changes });
    });
};

import { Request, Response } from 'express';
import db from '../config/database';

export const getAllChairRooms = (req: Request, res: Response) => {
    db.all(
        'SELECT * FROM chair_rooms',
        [],
        (err, rows) => {
            if (err) return res.status(500).json(err);
            res.json(rows);
        }
    );
};

export const getChairRoomById = (req: Request, res: Response) => {
    const { id } = req.params;
    db.get(
        'SELECT * FROM chair_rooms WHERE id = ?',
        [id],
        (err, row) => {
            if (err) return res.status(500).json(err);
            if (!row) return res.status(404).json({ message: 'ChairRoom not found' });
            res.json(row);
        }
    );
};

export const createChairRoom = (req: Request, res: Response) => {
    const { name } = req.body;
    db.run(
        'INSERT INTO chair_rooms (name) VALUES (?)',
        [name],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ id: this.lastID, name });
        }
    );
};

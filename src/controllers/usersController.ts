import { Request, Response } from 'express';
import db from '../config/database';
import sqlite3 from 'sqlite3';

export const getUsers = (req: Request, res: Response): void => {
  db.all(
    'SELECT * FROM users',
    [],
    (err: Error | null, rows: any[]) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json(rows);
    }
  );
};

export const getUserById = (req: Request, res: Response): void => {
  db.get(
    'SELECT * FROM users WHERE id = ?',
    [req.params.id],
    (err: Error | null, row: any) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json(row);
    }
  );
};

export const createUser = (req: Request, res: Response): void => {
  const { name, email } = req.body;

  db.run(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email],
    function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.json({
        id: this.lastID,
        name,
        email
      });
    }
  );
};

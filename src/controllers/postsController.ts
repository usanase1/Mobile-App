import { Request, Response } from 'express';
import db from '../config/database';

export const getPosts = (req: Request, res: Response) => {
  db.all(
    `SELECT posts.*, users.name AS user_name
     FROM posts
     JOIN users ON posts.user_id = users.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
};

export const createPost = (req: Request, res: Response) => {
  const { user_id, title, content } = req.body;

  db.run(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [user_id, title, content],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, user_id, title, content });
    }
  );
};

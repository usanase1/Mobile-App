"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChair = exports.updateChair = exports.getChairById = exports.createChair = exports.getAllChairs = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllChairs = (req, res) => {
    // Join with rooms to get room name, matching Android logic
    const query = `
        SELECT c.*, r.name as room_name 
        FROM chairs c 
        LEFT JOIN rooms r ON c.room_id = r.id
    `;
    database_1.default.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};
exports.getAllChairs = getAllChairs;
const createChair = (req, res) => {
    const { room_id, name, quantity, purchase_date, is_padded } = req.body;
    const query = `INSERT INTO chairs (room_id, name, quantity, purchase_date, is_padded) VALUES (?, ?, ?, ?, ?)`;
    database_1.default.run(query, [room_id, name, quantity, purchase_date, is_padded ? 1 : 0], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            room_id,
            name,
            quantity,
            purchase_date,
            is_padded: is_padded ? 1 : 0
        });
    });
};
exports.createChair = createChair;
const getChairById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT c.*, r.name as room_name 
        FROM chairs c 
        LEFT JOIN rooms r ON c.room_id = r.id
        WHERE c.id = ?
    `;
    database_1.default.get(query, [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Chair not found' });
            return;
        }
        res.json(row);
    });
};
exports.getChairById = getChairById;
const updateChair = (req, res) => {
    const { id } = req.params;
    const { room_id, name, quantity, purchase_date, is_padded } = req.body;
    const query = `
        UPDATE chairs 
        SET room_id = ?, name = ?, quantity = ?, purchase_date = ?, is_padded = ? 
        WHERE id = ?
    `;
    database_1.default.run(query, [room_id, name, quantity, purchase_date, is_padded ? 1 : 0, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Chair updated', changes: this.changes });
    });
};
exports.updateChair = updateChair;
const deleteChair = (req, res) => {
    const { id } = req.params;
    database_1.default.run('DELETE FROM chairs WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Deleted', changes: this.changes });
    });
};
exports.deleteChair = deleteChair;

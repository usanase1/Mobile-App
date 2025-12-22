"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.getRoomById = exports.createRoom = exports.getAllRooms = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllRooms = (req, res) => {
    database_1.default.all('SELECT * FROM rooms', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};
exports.getAllRooms = getAllRooms;
const createRoom = (req, res) => {
    const { name } = req.body;
    database_1.default.run('INSERT INTO rooms (name) VALUES (?)', [name], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name });
    });
};
exports.createRoom = createRoom;
const getRoomById = (req, res) => {
    const { id } = req.params;
    database_1.default.get('SELECT * FROM rooms WHERE id = ?', [id], (err, row) => {
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
exports.getRoomById = getRoomById;
const updateRoom = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    database_1.default.run('UPDATE rooms SET name = ? WHERE id = ?', [name, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Room updated', changes: this.changes });
    });
};
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => {
    const { id } = req.params;
    database_1.default.run('DELETE FROM rooms WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Room deleted', changes: this.changes });
    });
};
exports.deleteRoom = deleteRoom;

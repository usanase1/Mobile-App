"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChairRoom = exports.getChairRoomById = exports.getAllChairRooms = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllChairRooms = (req, res) => {
    database_1.default.all('SELECT * FROM chair_rooms', [], (err, rows) => {
        if (err)
            return res.status(500).json(err);
        res.json(rows);
    });
};
exports.getAllChairRooms = getAllChairRooms;
const getChairRoomById = (req, res) => {
    const { id } = req.params;
    database_1.default.get('SELECT * FROM chair_rooms WHERE id = ?', [id], (err, row) => {
        if (err)
            return res.status(500).json(err);
        if (!row)
            return res.status(404).json({ message: 'ChairRoom not found' });
        res.json(row);
    });
};
exports.getChairRoomById = getChairRoomById;
const createChairRoom = (req, res) => {
    const { name } = req.body;
    database_1.default.run('INSERT INTO chair_rooms (name) VALUES (?)', [name], function (err) {
        if (err)
            return res.status(500).json(err);
        res.json({ id: this.lastID, name });
    });
};
exports.createChairRoom = createChairRoom;

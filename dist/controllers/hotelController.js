"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.getHotelById = exports.getAllHotels = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllHotels = (req, res) => {
    database_1.default.all('SELECT * FROM hotels', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};
exports.getAllHotels = getAllHotels;
const getHotelById = (req, res) => {
    const { id } = req.params;
    database_1.default.get('SELECT * FROM hotels WHERE id = ?', [id], (err, row) => {
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
exports.getHotelById = getHotelById;
const createHotel = (req, res) => {
    const { name, address, category, price, image } = req.body;
    const query = `INSERT INTO hotels (name, address, category, price, image) VALUES (?, ?, ?, ?, ?)`;
    database_1.default.run(query, [name, address, category, price, image], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, name, address, category, price, image });
    });
};
exports.createHotel = createHotel;
const updateHotel = (req, res) => {
    const { id } = req.params;
    const { name, address, category, price, image } = req.body;
    const query = `
        UPDATE hotels 
        SET name = ?, address = ?, category = ?, price = ?, image = ? 
        WHERE id = ?
    `;
    database_1.default.run(query, [name, address, category, price, image, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Hotel updated', changes: this.changes });
    });
};
exports.updateHotel = updateHotel;
const deleteHotel = (req, res) => {
    const { id } = req.params;
    database_1.default.run('DELETE FROM hotels WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Hotel deleted', changes: this.changes });
    });
};
exports.deleteHotel = deleteHotel;

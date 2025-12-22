"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChairTable = void 0;
const database_1 = __importDefault(require("../config/database"));
const createChairTable = () => {
    database_1.default.run(`
    CREATE TABLE IF NOT EXISTS chairs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        room_id INTEGER,
        name TEXT,
        quantity INTEGER,
        purchase_date TEXT,
        is_padded INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(room_id) REFERENCES rooms(id)
    )
  `);
};
exports.createChairTable = createChairTable;

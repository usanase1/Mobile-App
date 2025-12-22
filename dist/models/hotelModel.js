"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotelTable = void 0;
const database_1 = __importDefault(require("../config/database"));
const createHotelTable = () => {
    database_1.default.run(`
    CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT,
      category TEXT,
      price TEXT,
      image TEXT,
      rating REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};
exports.createHotelTable = createHotelTable;

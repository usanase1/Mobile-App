"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite = sqlite3_1.default.verbose();
const dbPath = path_1.default.resolve(__dirname, '../../database/app.db');
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    }
    else {
        console.log('Connected to SGLite database');
    }
});
exports.default = db;

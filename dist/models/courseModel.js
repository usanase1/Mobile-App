"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourseTable = void 0;
const database_1 = __importDefault(require("../config/database"));
const createCourseTable = () => {
    database_1.default.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chair_room_id INTEGER NOT NULL,
      course_name TEXT NOT NULL,
      grade TEXT NOT NULL,
      credits INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (chair_room_id) REFERENCES chair_rooms(id)
    )
  `);
};
exports.createCourseTable = createCourseTable;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = exports.getCourses = void 0;
const database_1 = __importDefault(require("../config/database"));
const getCourses = (req, res) => {
    database_1.default.all(`
    SELECT courses.*, chair_rooms.name AS chair_room_name
    FROM courses
    JOIN chair_rooms ON courses.chair_room_id = chair_rooms.id
    `, [], (err, rows) => {
        if (err)
            return res.status(500).json(err);
        res.json(rows);
    });
};
exports.getCourses = getCourses;
const createCourse = (req, res) => {
    const { chair_room_id, course_name, grade, credits } = req.body;
    database_1.default.run(`INSERT INTO courses (chair_room_id, course_name, grade, credits)
     VALUES (?, ?, ?, ?)`, [chair_room_id, course_name, grade, credits], function (err) {
        if (err)
            return res.status(500).json(err);
        res.json({
            id: this.lastID,
            chair_room_id,
            course_name,
            grade,
            credits,
        });
    });
};
exports.createCourse = createCourse;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const router = (0, express_1.Router)();
router.get('/getAllUsers', studentController_1.getAllUsers);
router.get('/getUser/:id', studentController_1.getUserById);
router.post('/createCourse', studentController_1.createCourse);
exports.default = router;

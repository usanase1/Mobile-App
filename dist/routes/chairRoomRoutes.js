"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chairRoomController_1 = require("../controllers/chairRoomController");
const router = (0, express_1.Router)();
router.get('/getAllChairRooms', chairRoomController_1.getAllChairRooms);
router.get('/getChairRoom/:id', chairRoomController_1.getChairRoomById); // Normalized to singular/id
router.post('/createChairRoom', chairRoomController_1.createChairRoom);
exports.default = router;

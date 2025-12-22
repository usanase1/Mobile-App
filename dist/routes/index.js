"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomRoutes_1 = __importDefault(require("./roomRoutes"));
const chairRoutes_1 = __importDefault(require("./chairRoutes"));
const hotelRoutes_1 = __importDefault(require("./hotelRoutes"));
const router = (0, express_1.Router)();
router.use('/rooms', roomRoutes_1.default);
router.use('/chairs', chairRoutes_1.default);
router.use('/hotels', hotelRoutes_1.default);
router.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});
exports.default = router;

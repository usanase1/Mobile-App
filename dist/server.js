"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const chairRoomModel_1 = require("./models/chairRoomModel");
const hotelModel_1 = require("./models/hotelModel");
const chairModel_1 = require("./models/chairModel");
(0, chairRoomModel_1.createRoomsTable)();
(0, chairModel_1.createChairTable)();
(0, hotelModel_1.createHotelTable)();
const PORT = 3000;
app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

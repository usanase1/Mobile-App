"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'http://localhost:3000';
const runVerification = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('--- Verifying Backend ---');
        // 1. Check Root
        console.log('1. Checking Root...');
        const root = yield axios_1.default.get(`${BASE_URL}/`);
        console.log('Result:', root.data);
        // 2. Create Room
        console.log('\n2. Creating Room...');
        const roomRes = yield axios_1.default.post(`${BASE_URL}/rooms`, { name: 'Verification Room' });
        console.log('Room Created:', roomRes.data);
        const roomId = roomRes.data.id;
        // 3. Create Chair
        console.log('\n3. Creating Chair...');
        const chairRes = yield axios_1.default.post(`${BASE_URL}/chairs`, {
            room_id: roomId,
            name: 'Verification Chair',
            quantity: 5,
            purchase_date: '2025-01-01',
            is_padded: true
        });
        console.log('Chair Created:', chairRes.data);
        const chairId = chairRes.data.id;
        // 4. Get Chairs
        console.log('\n4. Getting Chairs...');
        const chairsRes = yield axios_1.default.get(`${BASE_URL}/chairs`);
        console.log(`Found ${chairsRes.data.length} chairs.`);
        const myChair = chairsRes.data.find((c) => c.id === chairId);
        if (myChair && myChair.room_name === 'Verification Room') {
            console.log('SUCCESS: Chair found with correct room name joining.');
        }
        else {
            console.error('FAILURE: Chair data incorrect or join failed.', myChair);
        }
        // 5. Delete Chair
        console.log('\n5. Deleting Chair...');
        yield axios_1.default.delete(`${BASE_URL}/chairs/${chairId}`);
        console.log('Chair Deleted.');
        console.log('\n--- Verification Complete ---');
    }
    catch (error) {
        console.error('Verification Failed:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
});
runVerification();

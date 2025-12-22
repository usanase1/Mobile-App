import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const runVerification = async () => {
    try {
        console.log('--- Verifying Backend ---');

        // 1. Check Root
        console.log('1. Checking Root...');
        const root = await axios.get(`${BASE_URL}/`);
        console.log('Result:', root.data);

        // 2. Create Room
        console.log('\n2. Creating Room...');
        const roomRes = await axios.post(`${BASE_URL}/rooms`, { name: 'Verification Room' });
        console.log('Room Created:', roomRes.data);
        const roomId = roomRes.data.id;

        // 3. Create Chair
        console.log('\n3. Creating Chair...');
        const chairRes = await axios.post(`${BASE_URL}/chairs`, {
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
        const chairsRes = await axios.get(`${BASE_URL}/chairs`);
        console.log(`Found ${chairsRes.data.length} chairs.`);
        const myChair = chairsRes.data.find((c: any) => c.id === chairId);
        if (myChair && myChair.room_name === 'Verification Room') {
            console.log('SUCCESS: Chair found with correct room name joining.');
        } else {
            console.error('FAILURE: Chair data incorrect or join failed.', myChair);
        }

        // 5. Delete Chair
        console.log('\n5. Deleting Chair...');
        await axios.delete(`${BASE_URL}/chairs/${chairId}`);
        console.log('Chair Deleted.');

        console.log('\n--- Verification Complete ---');

    } catch (error: any) {
        console.error('Verification Failed:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
};

runVerification();

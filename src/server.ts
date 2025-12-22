import app from './app';
import { createRoomsTable } from './models/chairRoomModel';
import { createHotelTable } from './models/hotelModel';
import { createChairTable } from './models/chairModel';

createRoomsTable();
createChairTable();
createHotelTable();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

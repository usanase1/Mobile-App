import { Router } from 'express';
import {
    getAllHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
} from '../controllers/hotelController';

const router = Router();

router.get('/getAllHotels', getAllHotels);
router.get('/getHotel/:id', getHotelById);
router.post('/createHotel', createHotel);
router.put('/updateHotel/:id', updateHotel);
router.delete('/deleteHotel/:id', deleteHotel);

export default router;

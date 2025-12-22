import { Router } from 'express';
import roomRoutes from './roomRoutes';
import chairRoutes from './chairRoutes';
import hotelRoutes from './hotelRoutes';

const router = Router();

router.use('/rooms', roomRoutes);
router.use('/chairs', chairRoutes);
router.use('/hotels', hotelRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

export default router;

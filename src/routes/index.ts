import { Router } from 'express';
import usersRoutes from './usersRoutes';
import postsRoutes from './postsRoutes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

export default router;

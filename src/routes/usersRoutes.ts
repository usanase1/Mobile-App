import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser
} from '../controllers/usersController';

const router = Router();

router.get('/getAllUsers', getUsers);
router.get('/getUser/:id', getUserById);
router.post('/createUser', createUser);

export default router;

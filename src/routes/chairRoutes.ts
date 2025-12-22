import { Router } from 'express';
import { getAllChairs, createChair, deleteChair, getChairById, updateChair } from '../controllers/chairController';

const router = Router();

router.get('/', getAllChairs);
router.post('/', createChair);
router.get('/:id', getChairById);
router.put('/:id', updateChair);
router.delete('/:id', deleteChair);

export default router;

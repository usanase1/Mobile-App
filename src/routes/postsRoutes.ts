import { Router } from 'express';
import { getPosts, createPost } from '../controllers/postsController';

const router = Router();

router.get('/getPost', getPosts);
router.post('/createPost', createPost);

export default router;

import express from 'express';
import { getUsers, getUserById, updateUserTags, getAllTags } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.get('/tags', protect, admin, getAllTags);
router.get('/:id', protect, admin, getUserById);
router.put('/:id/tags', protect, admin, updateUserTags);

export default router;

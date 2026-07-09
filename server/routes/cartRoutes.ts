import express from 'express';
import { getCart, updateCart, clearCart } from '../controllers/cartController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getCart);
router.put('/', protect, updateCart);
router.delete('/', protect, clearCart);

export default router;

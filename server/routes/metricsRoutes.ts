import express from 'express';
import { getMetrics, exportOrders, exportCustomers } from '../controllers/metricsController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, admin, getMetrics);
router.get('/export/orders', protect, admin, exportOrders);
router.get('/export/customers', protect, admin, exportCustomers);

export default router;

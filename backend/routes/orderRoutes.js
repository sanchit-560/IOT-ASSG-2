import express from 'express';
import { createOrder,confirmOrder } from '../controllers/orderController';
const router  = express.Router();
router.post('/',createOrder)
router.put('confirm/:id',confirmOrder)
export default router;

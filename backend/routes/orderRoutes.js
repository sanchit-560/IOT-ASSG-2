import express from 'express';
import { createOrder,confirmOrder } from '../controllers/orderController.js';
const router  = express.Router();
router.post('/',createOrder)
router.put('/confirm/:_id',confirmOrder)
export default router;

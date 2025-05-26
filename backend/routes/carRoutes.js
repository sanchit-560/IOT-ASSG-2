import express from 'express';
import { getAllCars, getCarAvailability } from '../controllers/carController.js';
const router = express.Router();
router.get('/',getAllCars)
router.get('/:vin/availability',getCarAvailability)
export default router;
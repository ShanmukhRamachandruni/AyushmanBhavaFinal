import express from 'express';

import { createSalesController, getSalesController } from '../controllers/salesController.js';

const router = express.Router()


router.post('/create-sales',createSalesController);
router.get('/get-sales',getSalesController);


export default router
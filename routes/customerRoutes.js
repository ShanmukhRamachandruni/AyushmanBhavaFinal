import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createCustomerController, getCustomerController, getSingleCustomerController, updateCustomerController } from '../controllers/customerController.js';
import { deleteCategoryCOntroller } from '../controllers/categoryController.js';
const router = express.Router()


router.post('/create-customer',requireSignIn,isAdmin,createCustomerController)
router.delete('/customer/:cid',requireSignIn,isAdmin,deleteCategoryCOntroller);
router.get('/get-customer',requireSignIn,isAdmin,getCustomerController);
router.get('/get-customer/:slug',requireSignIn,isAdmin,getSingleCustomerController);
router.put('/update-customer/:cid',requireSignIn,isAdmin,updateCustomerController);


export default router
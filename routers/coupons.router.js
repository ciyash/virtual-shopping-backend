import express from 'express';
import { createCoupon, getAllCoupons, getCouponById, deleteCouponById } from '../controllers/coupons.controller.js';
import upload from '../config/multer.js';  
import authMiddleware from '../config/jwt.middleware.js';

const router = express.Router();


router.post('/create', authMiddleware,upload.single('image'), createCoupon);


router.get('/', getAllCoupons);

router.get('/:id', getCouponById);

router.delete('/:id',authMiddleware,deleteCouponById);

export default router;

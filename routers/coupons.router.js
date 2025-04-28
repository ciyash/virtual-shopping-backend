import express from 'express';
import { createCoupon, getAllCoupons, getCouponById, deleteCouponById } from '../controllers/coupons.controller.js';
import upload from '../config/multer.js';  
import authMiddleware from '../config/jwt.middleware.js';

const router = express.Router();


router.post('/create', authMiddleware,upload.single('image'), createCoupon);

// Route to get all coupons
router.get('/', getAllCoupons);

// Route to get coupon by ID
router.get('/:id', getCouponById);

// Route to delete coupon by ID
router.delete('/:id',authMiddleware,deleteCouponById);

export default router;

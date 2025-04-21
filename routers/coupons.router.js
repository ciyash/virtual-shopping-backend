import express from 'express';
import { createCoupon, getAllCoupons, getCouponById, deleteCouponById } from '../controllers/coupons.controller.js';
import upload from '../config/multer.js';  // Import the multer upload setup

const router = express.Router();


router.post('/create', upload.single('image'), createCoupon);

// Route to get all coupons
router.get('/', getAllCoupons);

// Route to get coupon by ID
router.get('/:id', getCouponById);

// Route to delete coupon by ID
router.delete('/:id', deleteCouponById);

export default router;

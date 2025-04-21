import express from 'express';
import  cartController from '../controllers/cart.controller.js';
import authMiddleware from '../config/jwt.middleware.js';

const router = express.Router();

router.post('/', authMiddleware,cartController.createCartItem);
router.get('/user-cart', authMiddleware,cartController.getCartItemsByUserId);
router.patch('/:id', cartController.updateCartItem);
router.delete('/:id', authMiddleware,cartController.deleteCartItem);
router.delete('/delete-cart-items/', authMiddleware,cartController.deleteAllCartItems);

export default router;

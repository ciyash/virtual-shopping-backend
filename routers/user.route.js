import express from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../config/jwt.middleware.js'; 

const router = express.Router();

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

router.get('/all', userController.getAllUsers);
router.get('/profile', authMiddleware, userController.getUserById);
router.patch('/update', authMiddleware, userController.updateUser);
router.post('/change-password', authMiddleware, userController.changePassword);
router.delete('/:id', userController.deleteUser);

export default router;

import express from 'express';
import feedbackController from '../controllers/feedback.controller.js';
import authMiddleware from '../config/jwt.middleware.js'

const router = express.Router();


router.post('/create', authMiddleware, feedbackController.createFeedback);         
router.get('/get', feedbackController.getAllFeedbacks);                             
router.get('/:id', feedbackController.getFeedbackById);                           
router.patch('/:id', authMiddleware, feedbackController.updateFeedback);           
router.delete('/:id', authMiddleware, feedbackController.deleteFeedback);        

export default router;

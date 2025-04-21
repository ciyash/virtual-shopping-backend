import express from 'express';
import categoryController from '../controllers/category.controller.js';

const router = express.Router();

router.post('/create', categoryController.createCategory);
router.get('/get', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export default router;

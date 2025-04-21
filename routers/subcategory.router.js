import express from 'express';
import subcategoryController from '../controllers/subcategory.controller.js';

const router = express.Router();

router.post('/create', subcategoryController.createSubcategory);
router.get('/get', subcategoryController.getAllSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);
router.patch('/:id', subcategoryController.updateSubcategory);
router.delete('/:id', subcategoryController.deleteSubcategory);

export default router;

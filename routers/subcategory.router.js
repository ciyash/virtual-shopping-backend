import express from 'express';
import subcategoryController from '../controllers/subcategory.controller.js';
import getUpload from '../config/aws.upload.js'

const router = express.Router();

  
const uploadImage = getUpload('subcategory');

router.post('/create', uploadImage.single('image'),subcategoryController.createSubcategory);
router.get('/get', subcategoryController.getAllSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);
router.patch('/:id', subcategoryController.updateSubcategory);
router.delete('/:id', subcategoryController.deleteSubcategory);

export default router;

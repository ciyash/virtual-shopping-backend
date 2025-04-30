import express from 'express';
import subcategoryController from '../controllers/subcategory.controller.js';
import getUpload from '../config/aws.upload.js'
import authMiddleware from '../config/jwt.middleware.js'
const router = express.Router();

  
const uploadImage = getUpload('subcategory');

router.post('/create', authMiddleware,uploadImage.single('image'),subcategoryController.createSubcategory);

router.get('/get',subcategoryController.getAllSubcategories);

router.get('/:id',subcategoryController.getSubcategoryById);

router.patch('/:id',authMiddleware, subcategoryController.updateSubcategory);

router.delete('/:id',authMiddleware, subcategoryController.deleteSubcategory);

export default router;

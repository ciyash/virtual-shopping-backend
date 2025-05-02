import express from 'express';
import subcategoryController from '../controllers/subcategory.controller.js';
import getUpload from '../config/aws.upload.js'
import authMiddleware from '../config/jwt.middleware.js'
const router = express.Router();

  
const uploadImage = getUpload('subcategory');  

router.post('/create',uploadImage.single('image'),subcategoryController.createSubcategory);

router.get('/get',subcategoryController.getAllSubcategories);

router.get('/categoryId/:categoryId',subcategoryController.getSubcategoryByCategoryId)

router.get('/companyId/:companyId',subcategoryController.getSubcategoryByCompanyId)

router.get('/:id',subcategoryController.getSubcategoryById);

router.patch('/:id',authMiddleware,uploadImage.single('image'), subcategoryController.updateSubcategory);

router.delete('/:id', subcategoryController.deleteSubcategory);

export default router;

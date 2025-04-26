import express from 'express';
import getUpload from '../config/aws.upload.js'

import companyCategoryController from '../controllers/company.category.controller.js';

const router = express.Router();

const uploadImage = getUpload('Company-Category');

router.post('/', uploadImage.single('image'), companyCategoryController.createCompanyCategory);

router.get('/', companyCategoryController.getAllCompanyCategories);

router.get('/:id', companyCategoryController.getCompanyCategoryById);

router.patch('/:id', uploadImage .single('image'), companyCategoryController.updateCompanyCategory);

router.delete('/:id', companyCategoryController.deleteCompanyCategory);

export default router;

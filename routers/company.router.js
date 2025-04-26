import express from 'express';
import getUpload from '../config/aws.upload.js'
import companyController from '../controllers/company.controller.js';

const router = express.Router();

const uploadImage = getUpload('company');

router.post('/create', uploadImage.single('image'), companyController.createCompany);

router.get('/get', companyController.getAllCompanies);

router.get("/trending", companyController.getTrendingCompanies)

router.get('/:id', companyController.getCompanyById);

router.patch('/:id', uploadImage.single('image'), companyController.updateCompany);

router.delete('/:id', companyController.deleteCompany);

export default router;

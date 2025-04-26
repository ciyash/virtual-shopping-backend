import express from 'express';
import productController from '../controllers/product.controller.js';
import getUpload from '../config/aws.upload.js';

const router = express.Router();

const uploadImage = getUpload('Product');

router.post('/create', uploadImage.single('image'), productController.createProduct); 

router.get('/get', productController.getAllProducts); 

router.get("/top-deals",productController.getTopDealsProducts);

router.get('/:id', productController.getProductById); 

router.patch('/:id', uploadImage.single('image'), productController.updateProduct); 

router.delete('/:id', productController.deleteProduct); 

router.get('/subcategoryId/:subcategoryId',productController.getProductBySubcategory)

router.get('/companyId/:companyId',productController.getProductByCompanyId)



export default router;

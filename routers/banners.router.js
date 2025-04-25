import express from 'express';
import getUpload from '../config/aws.upload.js'
import bannersController from '../controllers/banners.controller.js';

const router = express.Router();

const uploadImage = getUpload('banners');

router.post('/create', uploadImage.single('image'), bannersController.createBanners);

router.get('/get', bannersController.getAllBanners);

router.patch('/:id', uploadImage.single('image'), bannersController.updateBanners);

router.delete('/:id', bannersController.deleteBanners);

export default router;

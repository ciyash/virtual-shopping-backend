import express from 'express';

import getUpload from '../config/aws.upload.js'
import logoController from '../controllers/logo.controller.js';

const router = express.Router();

const uploadImage = getUpload('logos');

router.post('/', uploadImage.single('image'), logoController.createLogo);
router.get('/', logoController.getAllLogos);
router.get('/:id', logoController.getLogoById);
router.delete('/:id', logoController.deleteLogo);


export default router;

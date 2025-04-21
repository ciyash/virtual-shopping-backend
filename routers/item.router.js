import express from 'express';
import itemController from '../controllers/item.controller.js';

import getUpload from '../config/aws.upload.js'

const router = express.Router();

const uploadItemImage = getUpload('items');

router.post('/', uploadItemImage.single('image'), itemController.createItem);

export default router;

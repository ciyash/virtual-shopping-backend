import express from 'express';
import contactController from '../controllers/contact.controller.js';

const router = express.Router();

router.post('/create', contactController.createContact);           
router.get('/get',contactController.getAllContacts);              
router.get('/:id',contactController.getContactById);              
router.delete('/:id', contactController.deleteContact);           

export default router;

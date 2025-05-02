import express from 'express';
import controller from '../controllers/memebership.controller.js'

const router = express.Router();

router.post('/', controller.createMembership);

router.get('/', controller.getAllMemberships);

router.get('/:id', controller.getMembershipsById);

router.patch('/:id', controller.updateMembership);

router.delete('/:id', controller.deleteMembership);

export default router;

import express from 'express';
import * as controller from '../controller/cartsController.js';

const router = express.Router();

router.post('/', controller.getCarts);
router.post('/add', controller.insert); //pid, size 가져옴
router.post('/count', controller.getCount); 

export default router;
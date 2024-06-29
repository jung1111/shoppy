import express from 'express';
import * as controller from '../controller/productController.js';

// all : 모든 상품
// detail : 개별 상품
// new : 새로운 상품


const router = express.Router();

router.post('/all', controller.getProducts);
router.get('/:id', controller.getProduct);
router.post('/new', controller.insert);




export default router;
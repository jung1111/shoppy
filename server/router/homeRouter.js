import express from 'express';
import * as controller from '../controller/homeController.js'


const router = express.Router();

//controller에 넘김
router.get('/', controller.getHome);

export default router;
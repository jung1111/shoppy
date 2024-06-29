import express from "express";
import * as controller from '../controller/boardController.js';

const router = express.Router();
/*  /board/new  */
router.post('/new', controller.insert);
router.post('/list', controller.list);
router.get('/:bid', controller.detail);
router.post('/update', controller.update); //수정완료버튼
router.post('/delete', controller.bidDelete); //삭제하기버튼
router.post('/updateHits', controller.updateHits); //조회수 

export default router;
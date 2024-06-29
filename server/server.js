import express from 'express';
import cors from 'cors';
import homeRouter from './router/homeRouter.js';
import productRouter from './router/productRouter.js';
import cartsRouter from './router/cartsRouter.js';
import memberRouter from './router/memberRouter.js';
import uploadRouter from './router/uploadRouter.js';
import boardRouter from './router/boardRouter.js';
import path from 'path';



const server = express();
const port = 8080;

//미들웨어
server.use(express.json());//json
server.use(express.urlencoded());//인코딩
server.use(cors())//네트워크 라이브러리
server.use('/uploads', express.static(path.join('uploads')));


// router로 넘긴 후 controller로 넘김
// server.get('/', (req, res)=>{
//     res.send('hello')
//     res.end()
// })


//대표 이름은 use로 한다.
server.use('/', homeRouter);
server.use('/product', productRouter);
server.use('/carts', cartsRouter);
server.use('/member', memberRouter);//로그인, 회원가입 공통적인 라우터일때 공통이름 준다.
server.use('/upload', uploadRouter);
server.use('/board', boardRouter);



// server.post('/carts', (req, res, next)=>{
//     const {items} = req.body;
//     console.log(items);
// })

server.listen(port, ()=>{
    console.log(`server:: ${port}`)
} ) //클라이언트
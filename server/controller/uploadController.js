import multer from 'multer';

//multer 라이브러리를 이용한 파일업로드
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
 
})

const fupload = multer({ storage: storage }).single('file');


/**
 * 파일 업로드 : 파일을 /uploads 폴더에 저장하는 작업
 */
export function upload(req, res){
  fupload(req, res, err => {
    if(err){
      console.log(err);
    }else{
      console.log(`${JSON.stringify(res.req.file)}`);
      console.log(`${JSON.stringify(res.req.file.path)}`);
      res.json({uploadImage: res.req.file.path, orgImage: req.file.originalname}); // res.req.file.path: 업로드 이미지 경로,  req.file.orgImage: 원본이름
    }
  })  
}

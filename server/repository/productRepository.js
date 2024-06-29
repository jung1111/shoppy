import {promises as fsPromises} from 'fs';// fs는 node 모듈에서 제공함, fsPromises는 promises의 별칭임
import {db} from '../db/database_mysql80.js';//모듈은 확장자 붙이기

//전체 상품 파일 읽어오기
export const getProducts = async(params) => {
		const sql = `
		select rno, id, image from
		(select row_number()over(order by pdate) as rno,
				pid as id,
						image
			from shoppy_product) sb
				where rno between ? and ?
		`;
	
		return db
				.execute(sql, [params.startIndex, params.endIndex])
				.then(result => result[0]); //[{},{}...] 


    // const path = 'data/product.json'
    // const products = fsPromises.readFile(path, 'utf-8')
    //     .then((data)=>{
    //         const jsonData = JSON.parse(data)
    //         return jsonData;
    //     })
    //     .catch(error=> console.log(error))

    // return products;
}  


//개별 상품 파일 읽어오기
export const getProduct = async(id) =>{
		const sql = `
			select pid as id, name, price, info, image
				from shoppy_product
				where pid = ?
		`;
		
		return db 
					.execute(sql, [id])
					.then(result => result[0][0]);



    // const path = 'data/product.json'
    // const products = fsPromises.readFile(path,'utf-8')
    //     .then((data)=>{
    //         const jsonData = JSON.parse(data);
    //         const product = jsonData.filter(item => item.id === id);//배열인지 객체인지 무엇으로 받는지 확인, 파라미터로 id 받아와야됨
    //         return product[0];//인덱스 0번째 
    //     })
    //     .catch(error => console.log(error))
    // return products;
}

//새상품 등록 
export const insert = async (productData) => {
    console.log('repository', productData);
		let result_rows = 0; //insert 성공하면 1로 바뀜
		const params = [
			productData.name,
			productData.price,
			productData.info,
			productData.uploadImage,
			productData.orgImage
		];
		//1. sql생성
		//2. db.execute
		
		const sql = `
			insert into shoppy_product(name, price, info, image, org_image ,pdate)
				values(?,? , ?, ?, ?,now())
		`;

		try {
				const [rows] = await db.execute(sql, params)
				// console.log('rows -> ', rows);
				result_rows = rows.affectedRows;
		} catch (error) {
			console.log(error);
		}



    return{cnt: result_rows};
}
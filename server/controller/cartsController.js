import * as repository from '../repository/cartsRepository.js'


/* 장바구니 count */
export const getCount = async(req, res) => {
	const {userId} = req.body;  //{userId:'test'} 들어있음
	// console.log('userId-->>', userId);
	const result = await repository.getCount(userId);
	res.json(result);
	res.end();
}


/* 장바구니 추가 : insert */
export const insert = async(req, res) => {
	const items = req.body; //{pid:9, size:'xs'}
	// console.log('items->>>',items);
	const result = await repository.insert(items);
	res.json(result);//cnt :1 detail로 넘어감
	res.end();


}

/* 장바구니 전체 리스트 */
export const getCarts = async (req, res) => {
    const { userId } = req.body;
    const cartList = await repository.getCarts(userId);//cartList = 새로운 카트리스트 -> items으로 받아서 새로 cartList 만든다.
    res.json(cartList);
    res.end();
}

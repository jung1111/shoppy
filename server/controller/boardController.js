import * as repository from '../repository/boardRepository.js';



// 게시글 조회수 업데이트
export const updateHits = async(req, res) => {
	const {bid} = req.body;
	const result = await repository.updateHits(bid);
	res.json(result);
}

// 게시글 삭제하기
export const bidDelete = async (req, res) => {
	const {bid} = req.body;
	const result = await repository.bidDelete(bid);
	res.json(result);
}

// 게시글 업데이트(수정완료 버튼 클릭)
export const update = async(req, res) => {
	const boardFormData =req.body;
	console.log('컨트롤러-boardFormData->', boardFormData);

	const result = await repository.update(boardFormData);
	res.json(result);

}

// 게시글 상세페이지 
export const detail = async (req, res) => { //req : get=>req.params, post=>req.body
	const bid =req.params.bid; 
	console.log('bid->',bid);
	const result = await repository.detail(bid);
	res.json(result);
}


//게시글 전체 리스트
export const list = async(req, res) => {
	const params = req.body;
	const result = await repository.list(params);
	res.json(result);

}

//게시판 등록 - post 방식
export const insert = async(req, res) => {
	const boardFormData = req.body;
	// console.log('boardFormData -> ', boardFormData);
	const result = await repository.insert(boardFormData);
	res.json(result); // {cnt : 1}
}


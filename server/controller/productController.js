import * as repository from '../repository/productRepository.js';

// 전체 상품 : all
export const getProducts = async (req, res) =>{
		const params = req.body;
    const products = await repository.getProducts(params);
    res.json(products)//res가 product.jsx 리액트가 됨
		res.end();
}

// 개별 상품 : detail
export const getProduct = async (req, res) =>{
    const product = await repository.getProduct(req.params.id);
    res.json(product);
}

// 새상품 등록 : new
export const insert = async (req, res) => {
    const productData = req.body;
    const result = await repository.insert(productData);
    res.json(result);
    res.end();
}


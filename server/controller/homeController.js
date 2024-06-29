import * as repository from '../repository/homeRepositorys.js'

export const getHome = async (req, res)=>{
   const products = await repository.getHome();
        res.json(products)//repository에서 받은 return값임. json객체.
        res.end()
}
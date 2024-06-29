import {promises as fsPromises} from 'fs'

export const getHome = () => {
    const path = 'data/product.json';
    const products =  fsPromises.readFile(path, 'utf-8')
        //한줄로 쓸 경우
        .then((data)=>JSON.parse(data))        
        .catch(error => console.log(error))
    return products; //리턴값이 controller로 간다.
}
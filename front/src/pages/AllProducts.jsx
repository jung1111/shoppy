import React from 'react';
import Product from '../component/Product';


export default function AllProducts() {
    return (
      <div className='content'>
        <h3 className='all-products-title'>All Products</h3>
        <Product />
      </div>
    );
}

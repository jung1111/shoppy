import React from 'react';

export default function ProductAbata({image}) {
  return(
    <div className='product-avata'>
        <img src={`http://localhost:8080/${image}`} />
    </div>
  );
}
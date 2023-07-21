import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from './ProductContext';
import ProductItem from './ProductItem';
import '../styles/ProductList.css';

const ProductList = () => {
  const { products, deleteProduct, editProduct } = useContext(ProductContext);
  const [displayCount, setDisplayCount] = useState(9);

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 9);
  };

  return (
    <div className='main-container'>
    <h1>Cortex Shop</h1>
      <Link to="/add-product">
        <button className='list-button' id='butt1'>Add Product</button>
      </Link>
    <div className="product-list">
      
    
        {products.slice(0, displayCount).map((product) => (
          <div key={product.id} className="product-item">
            <ProductItem product={product} deleteProduct={deleteProduct} editProduct={editProduct} />
          </div>
        ))}
      
      
    </div>
    {displayCount < products.length && (
        <button className='list-button' id='butt2' onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default ProductList;

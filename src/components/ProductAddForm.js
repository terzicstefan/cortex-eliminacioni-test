import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ProductContext from './ProductContext';
import '../styles/ProductAddForm.css'

const ProductAddForm = () => {
    const navigate = useNavigate();
    const { addProduct } = useContext(ProductContext); 

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {

    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Product added:', data);
        addProduct(data); 
        navigate('/'); 
      })
      .catch((err) => {
        console.log('Error adding product:', err);
      });
  };

  return (

    <>
    <h2 className='add-product-title'>Add Product</h2>
    <div className="add-product-container">
      
      <form className='add-product-form'>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
    </>
  );
};

export default ProductAddForm;

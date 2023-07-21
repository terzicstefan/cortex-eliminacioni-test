import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails'; 
import ProductAddForm from './components/ProductAddForm';

const App = () => {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<ProductAddForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    
  );
};

export default App;

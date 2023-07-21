import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductContext from "./ProductContext";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        console.log(res);
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (productId) => {
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product deleted:", data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((err) => {
        console.log("Error deleting product:", err);
      });
  };

  const editProduct = (productId, updatedProduct) => {
    fetch(`https://dummyjson.com/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product updated:", data);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .catch((err) => {
        console.log("Error updating product:", err);
      });
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, deleteProduct, editProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

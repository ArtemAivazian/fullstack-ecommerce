// App.js
import React, { useState } from 'react';
import './App.css';
import InventoryComponent from './component/InventoryComponent';
import { fetchProducts, createProduct } from './service/InventoryService';
import CreateProductForm from './component/CreateProductForm';
import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [infoMessage, setInfoMessage] = useState('');
  const [products, setProducts] = useState([]); // State for products

  // Function to fetch products from the backend
  const callBackend = () => {
    fetchProducts()
      .then((response) => {
        setProducts(response.data); // Update products state with fetched data
        setInfoMessage('Products fetched successfully');
      })
      .catch((error) => {
        console.error('Failed to fetch products', error);
        setInfoMessage('Error fetching products');
      });
  };

  // Function to create a new product
  const handleCreateProduct = (productDto) => {
    createProduct(productDto)
      .then((response) => {
        setInfoMessage(`Product '${response.data.name}' created successfully`);
        callBackend(); // Refresh the product list after creating a new product
      })
      .catch((error) => {
        console.error('Failed to create product', error);
        setInfoMessage('Error creating product');
      });
  };

  return (
    <div className="App">
      <div className="container mt-5">
        {/* Display the info message */}
        <h2>Welcome to My Secured React App</h2>
        <p>{infoMessage}</p>

        {/* Add a button to manually trigger the fetching of products */}
        <Button
          label="Fetch Products"
          onClick={callBackend}
          className="m-2"
          severity="success"
        />

        {/* Display the fetched products */}
        <InventoryComponent products={products} /> {/* Pass the products to the InventoryComponent */}

        {/* Product creation form */}
        <CreateProductForm onCreate={handleCreateProduct} />
      </div>
    </div>
  );
}

export default App;

// CreateProductForm.js
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProductForm = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const productDto = {
      name,
      price: parseFloat(price),
      description,
      quantity: parseInt(quantity, 10),
    };
    onCreate(productDto); // Call the onCreate function passed as a prop
    setName(''); // Reset form fields
    setPrice('');
    setDescription('');
    setQuantity('');
  };

  return (
    <div className="container mt-5">
      <h3>Create a New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Product Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Product Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Product Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter product quantity"
            required
          />
        </div>
        <Button label="Create Product" type="submit" className="mt-3" severity="success" />
      </form>
    </div>
  );
};

export default CreateProductForm;

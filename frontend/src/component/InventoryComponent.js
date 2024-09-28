// InventoryComponent.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryComponent = ({ products }) => {
  return (
    <div className="container mt-5">
      <h2>Products</h2>
      <ul className="list-group">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id} className="list-group-item">
              <strong>{product.name}</strong> - ${product.price}
            </li>
          ))
        ) : (
          <p>No products available. Please go back to the Home page and click "Fetch Products".</p>
        )}
      </ul>
    </div>
  );
};

export default InventoryComponent;

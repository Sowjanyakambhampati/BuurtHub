

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5005"; // Adjust the URL as needed

function AdminDashboardPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the products from the API
    const storedToken = localStorage.getItem("authToken");

    axios.get(`${API_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedToken}`
      }
    })
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/add-product">Add New Product</Link>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="product-list">
          {products.map(product => (
            <div key={product._id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price">{product.price} €</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboardPage;

// src/pages/AddProductPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:5005"; // Adjust the URL as needed

function AddProductPage() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        inStock: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedToken = localStorage.getItem("authToken");

        // Add the new product to the API
        axios.post(`${API_URL}/products`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        })
            .then(response => {
                console.log('Product added:', response.data);
                navigate('/dashboard');
            })
            .catch(error => console.error('Error adding product:', error));
    };

    return (
        <div>
            <h1>Add New Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        In Stock:
                        <select
                            name="inStock"
                            value={product.inStock}
                            onChange={handleChange}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </label>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProductPage;

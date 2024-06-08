// src/pages/AddProductPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    id: '',
    neighbourhood: '',
    productName: '',
    price: '',
    description: '',
    category: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a form data object to handle the image upload
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('neighbourhood', product.neighbourhood);
    formData.append('productName', product.productName);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    if (product.image) {
      formData.append('image', product.image);
    }

    // You can add your logic to handle the form submission here
    console.log('Product submitted: ', product);
    // Reset form fields
    setProduct({
      id: '',
      neighbourhood: '',
      productName: '',
      price: '',
      description: '',
      category: '',
      image: null
    });
  };

  return (
    <div>
      <h2>Add Product Listing</h2>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="neighbourhood">Neighbourhood:</label>
          <input
            type="text"
            id="neighbourhood"
            name="neighbourhood"
            value={product.neighbourhood}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label> 
          {/* MAKE IT A DROPDOWN 
          Furniture
          Electronics
          Clothing
          Pet Care
          Entertainment
          Sports


          */}
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;




/*
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
*/


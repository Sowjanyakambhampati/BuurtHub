import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
  const [product, setProduct] = useState({
    id: '',
    city: '',
    productName: '',
    price: '',
    image: null,
    description: '',
    condition: '',
    productOwner: '',
    category: ''
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
    formData.append('city', product.city);
    formData.append('productName', product.productName);
    formData.append('price', product.price);
    if (product.image) {
      formData.append('image', product.image);
    }
    formData.append('description', product.description);
    formData.append('condition', product.condition);
    formData.append('category', product.category);

    axios.post('https://community-forum-backend.adaptable.app', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Product submitted: ', response.data);
        // Reset form fields
        setProduct({
          id: '',
          city: '',
          productName: '',
          price: '',
          image: null,
          description: '',
          condition: '',
          productOwner: '',
          category: '',

        });
      })
      .catch(error => {
        console.error('There was an error submitting the product!', error);
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add Product Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1">Neighbourhood:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={product.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="productName" className="text-sm font-medium text-gray-700 mb-1">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">Price: €</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category:</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Kids">Kids</option>
            <option value="Pet Care">Pet Care</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;

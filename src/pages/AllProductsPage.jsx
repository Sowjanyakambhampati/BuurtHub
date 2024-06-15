import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideNav from '../components/SideNav';

function AllProductsPage() {
  const { city } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5005/product');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, conditionFilter, searchTerm]);

  const applyFilters = () => {
    let filtered = products.filter(product => {
      if (categoryFilter && product.category !== categoryFilter) return false;
      if (conditionFilter && product.condition !== conditionFilter) return false;
      if (searchTerm && !product.productName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Product Listing</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search product"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex mb-4">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-1/2 p-2 mr-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          >
            <option value="">All Categories</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Kids">Kids</option>
            <option value="Pet Care">Pet Care</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
          </select>
          <select
            value={conditionFilter}
            onChange={e => setConditionFilter(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          >
            <option value="">All Conditions</option>
            <option value="New-with-tags">New</option>
            <option value="Electronics">Very Good</option>
            <option value="Clothing">Good</option>
            <option value="Kids">Satisfactory</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  className="w-full h-40 object-cover mb-2"
                  src={product.image}
                  alt={product.productName}
                />
                <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-600 mb-2">{product.city}</p>
                <p className="text-gray-600 mb-2">{product.price} €</p>
                <p className="text-gray-600 mb-2">{product.productOwner}</p>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-gray-600 mb-2">{product.condition}</p>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))
          ) : (
            <p>No products found for this city.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProductsPage;

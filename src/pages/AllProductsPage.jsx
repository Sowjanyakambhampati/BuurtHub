import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext'; 


function AllProductsPage() {
  const { selectedCity } = useContext(CityContext); 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/products/${selectedCity}`);
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts with all products
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchProducts();
  }, [selectedCity]); // Fetch products whenever selectedCity changes

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, conditionFilter, searchTerm, products]); // Apply filters whenever any filter or products change

  const applyFilters = () => {
    let filtered = products.filter(product => {
      // Apply city filter
      if (product.city !== selectedCity) return false;
      // Apply category filter
      if (categoryFilter && product.category !== categoryFilter) return false;
      // Apply condition filter
      if (conditionFilter && product.condition !== conditionFilter) return false;
      // Apply search term filter
      if (searchTerm && !product.productName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
    setFilteredProducts(filtered);
  };

  const handleReserveClick = (productId) => {
    // Placeholder function for handling reserve button click
    console.log(`Product ${productId} reserved!`);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Product Listing in {selectedCity}</h2>
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
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Satisfactory">Satisfactory</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md relative">
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
                <button
                  className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleReserveClick(product._id)}
                >
                  Reserve
                </button>
              </div>
            ))
          ) : (
            <p>No products found for {selectedCity}.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProductsPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/product/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleReserveClick = async () => {
    const confirmReservation = window.confirm("Do you want to reserve this product?");
    if (confirmReservation) {
      try {
        await axios.post(`http://localhost:5005/user/reserve-product/${productId}`);
        toast.success('An email has been sent to the product owner. You will receive pickup instructions soon.');
      } catch (error) {
        console.error('Failed to reserve product', error);
        toast.error('Failed to reserve product.');
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4">{product.productName}</h2>
        <div className="flex">
          <div className="w-1/3">
            <img className="w-full h-100 object-cover mb-4" src={product.image} alt={product.productName} />
          </div>
          <div className="w-2/3 pl-4">
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-2">Price: €{product.price}</p>
            <p className="text-gray-600 mb-2">Owner: {product.productOwner}</p>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-gray-600 mb-2">Condition: {product.condition}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleReserveClick}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

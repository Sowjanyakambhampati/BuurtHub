import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';
import { IoIosPricetags } from "react-icons/io";
import { TbBox } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
const ProductDetailsPage = () => {
  const { productId } = useParams();
  const location = useLocation();
  const session = location.state?.session;
  const navigate = useNavigate();
  if (!session) {
    return <Navigate to="/login" />;
  }
  const { user } = session;
  const [product, setProduct] = useState({
    reservedById: user.id,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/product/${productId}`);
        setProduct(response.data);
        setIsFavorite(response.data.isFavorite); // Assuming API returns if product is favorite
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };
    fetchProductDetails();
  }, [productId]);
  const handleReserveClick = async (e) => {
    e.preventDefault();
    const confirmReservation = window.confirm("Do you want to reserve this product?");
    if (confirmReservation) {
      console.log('Product reserve :: ' + user.id);
      const updateData = {
        reservedById: user.id,
      };
      try {
        await axios.put(`https://community-forum-backend.adaptable.app/product/${productId}`, updateData);
        toast.success('An email has been sent to the product owner. You will receive pickup instructions soon.');
      } catch (error) {
        console.error('Failed to reserve product', error);
        toast.error('Failed to reserve product.');
      }
    }
  };
  const handleFavoriteClick = async () => {
    try {
      await axios.post(`https://community-forum-backend.adaptable.app/product/${productId}/favorite`, {
        userId: user.id,
        isFavorite: !isFavorite,
      });
      setIsFavorite(!isFavorite);
      toast.success(`Product ${!isFavorite ? 'added to' : 'removed from'} favorites.`);
    } catch (error) {
      console.error('Failed to update favorite status', error);
      toast.error('Failed to update favorite status.');
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
        <h2 className="text-3xl text-firstcolor font-bold mb-4">{product.productName}</h2>
        <div className="flex">
          <div className="w-1/3">
            <img className="w-full h-100 object-cover mb-8 rounded-lg -4" src={product.image} alt={product.productName} />
          </div>
          <div className="w-2/3 pl-4 m-8">
            <div className="flex justify-between items-center">
              <p className="flex text-firstcolor mb-4"><BsFillInfoCircleFill className="m-1" />{product.description}</p>
             
            </div>
            <p className="flex text-firstcolor mb-2 text-left"><IoIosPricetags className="m-1" /> € {product.price}.00</p>
            <p className="flex text-firstcolor mb-2 text-left"><TbBox className="m-1" />{product.condition}</p>
            <p className="flex text-firstcolor mb-2 text-left"><MdCategory className="m-1" />{product.category}</p>
            <diV className="flex space-x-4"><button onClick={handleFavoriteClick} className="text-l mt-4 py-3 h-10 px-6 bg-secondcolor">
                {isFavorite ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
              </button>
            <button
              className={`mt-4 px-4 py-2 rounded-md ${product.reservedById ? 'bg-gray-500' : 'bg-secondcolor hover:bg-thirdcolor text-white w-1/4'}`}
              onClick={handleReserveClick}
              disabled={!!product.reservedById}
            >
              Reserve
            </button>
            </diV>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
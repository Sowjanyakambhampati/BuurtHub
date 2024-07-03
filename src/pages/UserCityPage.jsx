import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext'; 
import { IoIosPricetags } from "react-icons/io";
import { TbBox } from "react-icons/tb";
import { MdCategory } from "react-icons/md";


function UserCityPage() {
  const { city } = useParams();
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const { selectedCity, setSelectedCity } = useContext(CityContext);

  useEffect(() => {
    setSelectedCity(city);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/product/city/${city}`);
        setProducts(response.data.slice(-3)); 
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/event/city/${city}`);
        setEvents(response.data.slice(-3)); 
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/posts/city/${city}`);
        setPosts(response.data.slice(-3)); 
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchProducts();
    fetchEvents();
    fetchPosts();
  }, [city, setSelectedCity]);

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">Hi! Welcome to the {city} Community!</h1>
          <img className="w-full h-300 object-cover mb-4 " src={`/cities/${city}.jpg`} alt={`${city}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Items for sale in the community</h2>
          <div className="flex justify-end">
            <Link to={`/all-products/city/${selectedCity}`} className="text-blue-500  mb-2">See all products</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img className="w-full h-40 object-cover mb-2 rounded-lg" src={product.image} alt={product.productName} />
                  <h3 className="text-xl font-semibold mb-2 text-left">{product.productName}</h3>
                  <p className="flex text-gray-600 mb-2 text-left"><IoIosPricetags className = "m-1"/> € {product.price}.00</p>
                  <p className="flex text-gray-600 mb-2 text-left"><TbBox className = "m-1"/>{product.condition}</p>
                  <p className="flex text-gray-600 mb-2 text-left"><MdCategory className = "m-1"/>{product.category}</p>
                  
                </div>
              ))
            ) : (
              <p>No products found for this city. </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-8">Upcoming Events in the community</h2>
          <div className="flex justify-end">
            <Link to={`/all-events/city/${selectedCity}`} className="text-blue-500  mb-2">See all events</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img className="w-full h-40 object-cover mb-2" src={event.image} alt={event.title} />
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{event.price}</p>
                  <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-2">{new Date(event.time).toLocaleTimeString()}</p>
                  <p className="text-gray-600 mb-2">{event.locationUrl}</p>
                </div>
              ))
            ) : (
              <p>No events found for this city.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-8">Community Posts</h2>
          <div className="flex justify-end">
            <Link to={`/all-posts/city/${selectedCity}`} className="text-blue-500 ">See all posts</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                <img className="w-full h-40 object-cover mb-2" src={post.image} alt={post.title} />
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{post.postAuthor}</p>
                  <p className="text-gray-600 mb-2">{post.content}</p>
                  <p className="text-gray-600 mb-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-2">Contact me on {post.contactInfo}</p>
                  
                </div>
              ))
            ) : (
              <p>No posts found for {selectedCity}.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCityPage;

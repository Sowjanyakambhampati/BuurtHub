import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext'; 

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
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/city/${city}`);
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
          <img className="w-full h-300 object-cover mb-4" src={`/cities/${city}.jpg`} alt={`${city}`} />
        </div>
        <div>
          
            <h2 className="text-2xl font-bold mb-2">Items for sale in the community</h2>
            <div className="flex justify-end">
            <Link to={`/all-products/city/${selectedCity}`} className="text-blue-500 underline mb-2 ">See all products</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img className="w-full h-40 object-cover mb-2" src={product.image} alt={product.productName} />
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
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-8">Upcoming Events in the community</h2>
          <div className="flex justify-end">
          <Link to={`/all-events/city/${selectedCity}`} className="text-blue-500 underline mb-2">See all events</Link>
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
                  <p className="text-gray-600 mb-2">{event.location}</p>
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
          <Link to={`/all-posts/city/${selectedCity}`} className="text-blue-500 underline">See all posts</Link> 
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img className="w-8 h-8 rounded-full mb-2" src={post.image} alt="Profile" />
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{post.content}</p>
                  <p className="text-gray-600 mb-2">By {post.postAuthor}</p>
                  <p className="text-gray-600 mb-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                  {post.contactInfo && <p className="text-gray-600 mb-2">Contact: {post.contactInfo}</p>}
                </div>
              ))
            ) : (
              <p>No posts found for this city.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCityPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import SideNav from "../components/SideNav";

function UserCityPage() {
  const { city } = useParams();
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://community-forum-backend.adaptable.app/product");
        setProducts(response.data.slice(-3)); // Displaying only the first three products
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();

    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://community-forum-backend.adaptable.app/events");
        setEvents(response.data.slice(-3)); // Displaying only the first three events
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <div>
          <h1 className="text-3xl font-bold mb-4">Hi! Welcome to the {city} Community!</h1>
          <img className="w-full h-auto mb-4" src={`/cities/${city}.jpg`} alt={`${city}`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Product Listing</h2>
          <Link to={'/all-products'} className="text-blue-500 underline mb-2">See all products</Link>
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
          <h2 className="text-2xl font-bold mb-2 mt-8">Upcoming Events</h2>
          <Link to={'/all-events'} className="text-blue-500 underline mb-2">See all events</Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
                  <img className="w-full h-40 object-cover mb-2" src="/events.jpg" alt="Event" />
                  <h3 className="text-xl font-semibold mb-2">{event.eventName}</h3>
                  <p className="text-gray-600 mb-2">{event.date}</p>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              ))
            ) : (
              <p>No events found for this city.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-8">Discussions</h2>
          <h3 className="text-blue-500 underline">See all discussions</h3>
        </div>
      </div>
    </div>
  );
}

export default UserCityPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function UserCityPage() {
  const { city } = useParams([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5005/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <h1>Hi! Welcome to the {city} Community!</h1>
      </div>
      <div>
        <img className="city-img" src={`/cities/${city}.jpg`} alt={`${city}`} />
      </div>
      <div>
        <h2>Product Listing</h2>
        <Link to = {'/all-products'}>See all products</Link> 
        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>

                <img
                  className="tile2"
                  src="/events.jpg"
                  alt={product.productName}
                />
                <p>{product.productName}</p>
                <p>{product.city}</p>
                <p>{product.price} €</p>
                <p>{product.productOwner}</p>
                <p>{product.category}</p>
                <p>{product.condition}</p>
                <p>{product.description}</p>
              </div>
            ))
          ) : (
            <p>No products found for this city.</p>
          )}
        </div>
      </div>
      <div>
        <h2>Upcoming Events</h2>
        <h3>See all events</h3>
        <div>
          <div>
            <img className="tile2" src="/events.jpg" alt="Community Cleanup" />
            <p>Community Cleanup</p>
            <p>June 15, 2024</p>
            <p>
              Join us for a community-wide cleanup event to keep our
              neighborhood beautiful.
            </p>
          </div>
          <div>
            <img className="tile2" src="/events.jpg" alt="Summer Festival" />
            <p>Summer Festival</p>
            <p>July 20, 2024</p>
            <p>
              Celebrate summer with music, food, and fun activities for all
              ages.
            </p>
          </div>
          <div>
            <img className="tile2" src="/events.jpg" alt="Book Club" />
            <p>Book Club Meeting</p>
            <p>August 5, 2024</p>
            <p>
              Join our monthly book club meeting to discuss the latest read with
              fellow book enthusiasts.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>Discussions</h2>
        <h3>See all discussions</h3>
      </div>
    </div>
  );
}

export default UserCityPage;

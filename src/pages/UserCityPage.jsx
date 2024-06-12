import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function UserCityPage() {

  const { city } = useParams([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  // const { event } = useParams([]);
useEffect(() => {
    axios.get(`http://localhost:5005/products/${city}`)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        setLoading(false);
      });
  }, [city]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h1>Hi! Welcome to the {city} Community!</h1>
      </div>
      <div>
        <img className='city-img' src={`/cities/${city}.jpg`} alt={`${city}`} />
      </div>
      <div>
        <h2>Product Listing</h2>
        <h3>See all products</h3>
        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>
                <img className="tile2" src={product.image} alt={product.productName} />
                <p>{product.productName}</p>
                <p>{product.price} $</p>
                <p>{product.condition}</p>
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
            <img className="tile2" src='/events.jpg' alt='Community Cleanup' />
            <p>Community Cleanup</p>
            <p>June 15, 2024</p>
            <p>Join us for a community-wide cleanup event to keep our neighborhood beautiful.</p>
          </div>
          <div>
            <img className="tile2" src='/events.jpg' alt='Summer Festival' />
            <p>Summer Festival</p>
            <p>July 20, 2024</p>
            <p>Celebrate summer with music, food, and fun activities for all ages.</p>
          </div>
          <div>
            <img className="tile2" src='/events.jpg' alt='Book Club' />
            <p>Book Club Meeting</p>
            <p>August 5, 2024</p>
            <p>Join our monthly book club meeting to discuss the latest read with fellow book enthusiasts.</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Discussions</h2>
        <h3>See all discussions</h3>
      </div>
    </div>
  )
}

export default UserCityPage;


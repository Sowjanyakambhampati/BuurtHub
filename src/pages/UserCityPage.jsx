import React from 'react';
import { useParams } from 'react-router-dom';

function UserCityPage() {

  const { city } = useParams([]);

  // const { product } = useParams([]);
  // const { event } = useParams([]);


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

        {/* <div>
        <img className="tile2" src = {'image'} alt = {image} />
        <p>{productName}</p>
        <p>{price}</p>
        <p>{condition}</p>
        </div> */}
        <div>
          <div>
            <img className="tile2" src='/public/products/washing-machine.jpg' alt='events' />
            <p>Bosch Washing Machine</p>
            <p>100 $</p>
            <p>Very Good</p>
          </div>
          <div>
            <img className="tile2" src='/public/products/kids-table.jpg' alt='kids' />
            <p>kids table</p>
            <p>30 $</p>
            <p>Very Good</p>
          </div>
          <div>
            <img className="tile2" src='/public/products/womens-dress.jpg' alt='womens-dress' />
            <p>womens white dress</p>
            <p>100 $</p>
            <p>Very Good</p>
          </div>
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

export default UserCityPage

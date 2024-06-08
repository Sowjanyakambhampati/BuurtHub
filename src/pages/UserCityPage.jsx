import React from 'react';
import { useParams } from 'react-router-dom';

function UserCityPage() {

const { city } = useParams([]);


  return (
    <div>
      <div>
      <h1>Hi! Welcome to the {city} Community!</h1>
      
      </div>
      <div>
      <img src={`/public/cities/${city}.jpg`} alt={`${city}`} />
      
      </div>
      <div>
        <p>Product Listing</p>
      </div>
      <div>
        <p>Events</p>
      </div>
      <div>
        <p>Discussions</p>
      </div>
    </div>
  )
}

export default UserCityPage

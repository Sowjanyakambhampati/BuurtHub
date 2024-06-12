import React from 'react';
import { useParams } from 'react-router-dom';

function AllProductsPage() {
  const { city } = useParams([]);
  return (
    <div>
        <h1> Upcoming Events in {city} </h1>



  
    </div>
  )
}

export default AllProductsPage

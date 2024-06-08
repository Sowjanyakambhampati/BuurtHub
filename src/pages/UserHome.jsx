import React from 'react';
import { useParams } from 'react-router-dom';

function UserHome() {

const { city } = useParams();
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome to the dashboard for {city}!</p>
    </div>
  )
}

export default UserHome

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';
import GoogleMap from '../components/GoogleMap'; // Assuming you have a GoogleMap component
const EventDetailsPage = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const session = location.state?.session;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/event/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch event details', error);
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId, session]);
  if (!session) {
    return <Navigate to="/login" />;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    toast.error(error);
    return <div>Error loading event details</div>;
  }
  if (!event) {
    return <div>No event found</div>;
  }
  const { title, description, date, time, city, address, locationUrl, organiser, price, category, image, location: eventLocation } = event;
  const hasLocation = eventLocation && eventLocation.coordinates && eventLocation.coordinates.latitude && eventLocation.coordinates.longitude;
  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <div className="flex">
          <div className="w-1/3">
            {image && (
              <img className="w-full h-100 object-cover mb-4" src={image} alt={title} />
            )}
          </div>
          <div className="w-2/3 pl-4">
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-600 mb-2">Date: {new Date(date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-2">Time: {time}</p>
            <p className="text-gray-600 mb-2">City: {city}</p>
            <p className="text-gray-600 mb-2">Address: {address}</p>
            <p className="text-gray-600 mb-2">Location: <a href={locationUrl} target="_blank" rel="noopener noreferrer">{locationUrl}</a></p>
            <p className="text-gray-600 mb-2">Organiser: {organiser}</p>
            <p className="text-gray-600 mb-2">Price: {price}</p>
            <p className="text-gray-600 mb-2">Category: {category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDetailsPage;

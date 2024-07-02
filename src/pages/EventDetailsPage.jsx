import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GoogleMap from '../components/GoogleMap';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event details', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  const { location } = event;
  const hasLocation = location && location.lat && location.lng;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-2">Time: {event.time}</p>
      <p className="text-gray-600 mb-2">City: {event.city}</p>
      <p className="text-gray-600 mb-2">Location: {event.locationUrl}</p>
      <p className="text-gray-600 mb-2">Organiser: {event.organiser}</p>
      <p className="text-gray-600 mb-2">Price: {event.price}</p>
      <p className="text-gray-600 mb-2">Category: {event.category}</p>
      {event.image && (
        <img src={event.image} alt={event.title} className="mt-4 rounded-md" style={{ maxWidth: '100%', height: 'auto' }} />
      )}
      {/*<div className="mt-4">*/}
      {/*  {hasLocation ? (*/}
      {/*    <GoogleMap latitude={location.lat} longitude={location.lng} />*/}
      {/*  ) : (*/}
      {/*    <p>Location information is not available.</p>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default EventDetailsPage;

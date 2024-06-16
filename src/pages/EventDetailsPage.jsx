import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EventRegistration from '../components/EventRegistration';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/${eventId}`);
        setEvent(response.data);
        initMap(response.data.location); // Initialize map with location
      } catch (error) {
        console.error('Failed to fetch event details', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const initMap = (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK') {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: results[0].geometry.location,
        });
        new window.google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-2">City: {event.city}</p>
      <p className="text-gray-600 mb-2">Location: {event.location}</p>
      <p className="text-gray-600 mb-2">Organiser: {event.organiser}</p>
      {event.imageUrl && (
        <img src={event.imageUrl} alt={event.title} className="mb-4 rounded-lg shadow-md" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EventRegistration eventId={event._id} />
        <div id="map" className="w-full h-64 rounded-lg shadow-md"></div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CityContext } from '../context/CityContext';
import { Link } from 'react-router-dom';
import SideNav from '../components/SideNav';
function AllEventsPage() {
  const { selectedCity } = useContext(CityContext);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/events/${selectedCity}`);
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error fetching the events!', error);
      }
    };
    fetchEvents();
  }, [selectedCity]);
  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-4">Events in {selectedCity}</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Organiser:</strong> {event.organiser}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Price:</strong> {event.price}</p>
              <img src={event.image} alt={event.title} className="w-full h-64 object-cover mt-2 rounded-md" />
              <Link to={`/event/${event._id}`} className="text-indigo-600 hover:underline mt-2 block">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AllEventsPage;
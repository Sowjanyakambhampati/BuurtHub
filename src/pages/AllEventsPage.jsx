import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from '../components/SideNav';

function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5005/event');
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cityFilter, searchTerm]);

  const applyFilters = () => {
    let filtered = events.filter(event => {
      if (cityFilter && event.city !== cityFilter) return false;
      if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
    setFilteredEvents(filtered);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search event"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex mb-4">
          <select
            value={cityFilter}
            onChange={e => setCityFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          >
            <option value="">All Cities</option>
            {/* Add more city options here if needed */}
            <option value="City1">Amsterdam</option>
            <option value="City2">Rotterdam</option>
            <option value="City3">Utrecht</option>
            <option value="City4">Den Hague</option>
            <option value="City5">Eindhoven</option>
            <option value="City6">Gronigen</option>
            <option value="City7">Zwolle</option>
            <option value="City8">Leiden</option>
            <option value="City9">Nijmegen</option>
            <option value="City10">Hoofddorp</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">City: {event.city}</p>
                <p className="text-gray-600 mb-2">Location: {event.location}</p>
                <p className="text-gray-600 mb-2">Organiser: {event.organiser}</p>
                {event.image && (
                  <img src={event.image} alt={event.title} className="mt-4 rounded-md" style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </div>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllEventsPage;

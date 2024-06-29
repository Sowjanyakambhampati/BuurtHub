
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext';
import { Link } from 'react-router-dom';

function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedCity } = useContext(CityContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`https://community-forum-backend.adaptable.app/event/city/${selectedCity}`);
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, [selectedCity]);

  useEffect(() => {
    applyFilters();
  }, [categoryFilter, searchTerm]);

  const applyFilters = () => {
    let filtered = events.filter(event => {
      if (categoryFilter && event.category !== categoryFilter) return false;
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
        <h2 className="text-2xl font-bold mb-4">Upcoming Events in {selectedCity}</h2>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Search event"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          />
          <Link to={`/city/${selectedCity}/add-event`} className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Add New Event
          </Link>
        </div>
        <div className="flex mb-4">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          >
            <option value="">All Categories</option>
            <option value="Art and Culture">Art and Culture</option>
            <option value="Health and Wellness">Health and Wellness</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Community & Environment">Community & Environment</option>
            <option value="Career">Career</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link to={`/all-events/city/${selectedCity}/event/${event._id}`} key={event._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-2">{event.category}</p>
                <p className="text-gray-600 mb-2">{event.location}</p>
                <p className="text-gray-600 mb-2">{event.organiser}</p>
                {event.image && (
                  <img src={event.image} alt={event.title} className="mt-4 rounded-md" style={{ maxWidth: '100%', height: 'auto' }} />
                )}
              </Link>
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

/*import React, { useEffect, useState, useContext } from 'react';
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
*/
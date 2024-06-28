import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CityContext } from '../context/CityContext';
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
const AddEvent = () => {
  const { selectedCity } = useContext(CityContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    date: '',
    address: '',
    location: { lat: 0, lng: 0 },
    image: null,
    description: '',
    organiser: '',
    city: selectedCity,
    participants: [],
    time: '',
    price: '',
    category: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };
  const handleImageChange = (e) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      image: e.target.files[0]
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('date', event.date);
    formData.append('description', event.description);
    formData.append('organiser', event.organiser);
    formData.append('city', event.city);
    formData.append('time', event.time);
    formData.append('price', event.price);
    formData.append('category', event.category);
    formData.append('participants', JSON.stringify(event.participants));
    if (event.image) {
      formData.append('image', event.image);
    }
    try {
      // Geocode the address
      const geocodeResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(event.address)}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      if (geocodeResponse.data.status === 'OK') {
        const location = geocodeResponse.data.results[0].geometry.location;
        formData.append('location', JSON.stringify({ type: 'Point', latitude: location.lat, longitude: location.lng }));
        // Log formData for debugging
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        // Submit the event
        const response = await axios.post('http://localhost:5005/event', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Event submitted:', response.data);
        setEvent({
          title: '',
          date: '',
          address: '',
          location: { lat: 0, lng: 0 },
          image: null,
          description: '',
          organiser: '',
          city: selectedCity,
          participants: [],
          time: '',
          price: '',
          category: ''
        });
        navigate(`/all-events/${selectedCity}`);
      } else {
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.error('There was an error submitting the event!', error);
    }
  };
  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-4">Add Event in {event.city}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: 'title', type: 'text', label: 'Title', value: event.title },
            { id: 'description', type: 'textarea', label: 'Description', value: event.description },
            { id: 'date', type: 'date', label: 'Date', value: event.date },
            { id: 'time', type: 'time', label: 'Time', value: event.time },
            { id: 'city', type: 'text', label: 'City', value: event.city, readOnly: true },
            { id: 'address', type: 'text', label: 'Address', value: event.address },
            { id: 'organiser', type: 'text', label: 'Organiser', value: event.organiser },
          ].map(({ id, type, label, value, readOnly = false }) => (
            <div key={id} className="form-group flex items-center">
              <label htmlFor={id} className="w-1/4 text-sm font-medium text-gray-700">{label}:</label>
              {type === 'textarea' ? (
                <textarea id={id} name={id} value={value} onChange={handleChange} readOnly={readOnly}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              ) : (
                <input id={id} type={type} name={id} value={value} onChange={handleChange} readOnly={readOnly}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              )}
            </div>
          ))}
          <div className="form-group flex items-center">
            <label htmlFor="category" className="w-1/4 text-sm font-medium text-gray-700">Category:</label>
            <select id="category" name="category" value={event.category} onChange={handleChange}
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="">Select a category</option>
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
          <div className="form-group flex items-center">
            <label htmlFor="price" className="w-1/4 text-sm font-medium text-gray-700">Price:</label>
            <select id="price" name="price" value={event.price} onChange={handleChange}
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="">Select price option</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div className="form-group flex items-center">
            <label htmlFor="image" className="w-1/4 text-sm font-medium text-gray-700">Image:</label>
            <input id="image" name="image" type="file" onChange={handleImageChange} accept="image/*"
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <button type="submit"
            className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddEvent;


import React, { useState, useContext } from "react";
import axios from "axios";
import { CityContext } from "../context/CityContext";
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';

function AddEvent() {
  const { selectedCity } = useContext(CityContext);
  const navigate = useNavigate(); 
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    city: selectedCity,
    location: '',
    organiser: '',
    category: '',
    image: null,
    price: '',
    participants: []
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
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("date", event.date);
    formData.append("time", event.time);
    formData.append("city", event.city);
    formData.append("location", event.location);
    formData.append("organiser", event.organiser);
    formData.append("category", event.category);
    formData.append("participants", JSON.stringify(event.participants));
    if (event.image) {
      formData.append("image", event.image);
    }
    formData.append("price", event.price);

    // Log formData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post("https://community-forum-backend.adaptable.app/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Event submitted: ", response.data);
      setEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        city: selectedCity,
        location: '',
        organiser: '',
        category: '',
        image: null,
        price: '',
        participants: []
      });
      navigate(`/all-events/city/${selectedCity}`);
    } catch (error) {
      console.error("There was an error submitting the event!", error);
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
            { id: "title", type: "text", label: "Title", value: event.title },
            { id: "description", type: "textarea", label: "Description", value: event.description },
            { id: "date", type: "date", label: "Date", value: event.date },
            { id: "time", type: "time", label: "Time", value: event.time },
            { id: "city", type: "text", label: "City", value: event.city, readOnly: true },
            { id: "location", type: "text", label: "Location", value: event.location },
            { id: "organiser", type: "text", label: "Organiser", value: event.organiser },
          ].map(({ id, type, label, value, readOnly = false }) => (
            <div key={id} className="form-group flex items-center">
              <label htmlFor={id} className="w-1/4 text-sm font-medium text-gray-700">{label}:</label>
              {type === "textarea" ? (
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

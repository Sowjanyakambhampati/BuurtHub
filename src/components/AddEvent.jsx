import React, { useState } from "react";
import axios from "axios";

function AddEvent() {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    city: '',
    location: '',
    organiser: '',
    image: null
  });

  // const AddEvent = ({ onAddEvent }) => {
  //   const [title, setTitle] = useState('');
  //   const [description, setDescription] = useState('');
  //   const [date, setDate] = useState('');
  //   const [city, setCity] = useState('');
  //   const [location, setLocation] = useState('');
  //   const [organiser, setOrganiser] = useState('');
  //   const [image, setImage] = useState(null);

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
    formData.append("city", event.city);
    formData.append("location", event.location);
    formData.append("organiser", event.organiser);
    if (event.image) {
      formData.append("image", event.image); // Ensure this matches the field name in multer configuration
    }

    axios
      .post("http://localhost:5005/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Event submitted: ", response.data);
        // Reset form fields
        setEvent({
          title: '',
          description: '',
          date: '',
          city: '',
          location: '',
          organiser: '',
          image: '',
        });
      })
      .catch((error) => {
        console.error("There was an error submitting the product!", error);
      });
  };

  //     ;

  //     onAddEvent(response.data);
  //     setTitle('');
  //     setDescription('');
  //     setDate('');
  //     setCity('');
  //     setLocation('');
  //     setOrganiser('');
  //     setImage(null);
  //   } catch (error) {
  //     console.error('Error creating event:', error);
  //   }
  // };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            id="title"
            name="title"
            value={event.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date:
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City:
          </label>
          <input
            id="city"
            name="city"
            value={event.city}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location:
          </label>
          <input
            id="location"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="organiser"
            className="block text-sm font-medium text-gray-700"
          >
            Organiser:
          </label>
          <input
            id="organiser"
            name="organiser"
            value={event.organiser}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image:
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;

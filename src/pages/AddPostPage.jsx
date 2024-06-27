import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CityContext } from '../context/CityContext';
import SideNav from '../components/SideNav';

const AddPost = ({ onAddPost }) => {
  const { selectedCity } = useContext(CityContext); 
  const [city, setCity] = useState(selectedCity);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Get today's date in "27th June, 2024" format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate());
    const daySuffix = (day) => {
      if (day.endsWith('1') && !day.endsWith('11')) return 'st';
      if (day.endsWith('2') && !day.endsWith('12')) return 'nd';
      if (day.endsWith('3') && !day.endsWith('13')) return 'rd';
      return 'th';
    };
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day}${daySuffix(day)} ${month}, ${year}`;
  };

  const [createdAt, setCreatedAt] = useState(getCurrentDate());

  useEffect(() => {
    setCity(selectedCity); // Update city state when selectedCity changes
  }, [selectedCity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('city', city);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('createdAt', createdAt);
    formData.append('contactInfo', contactInfo);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://community-forum-backend.adaptable.app/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onAddPost(response.data);
      setTitle('');
      setContent('');
      setAuthor('');
      setCreatedAt(getCurrentDate());
      setContactInfo('');
      setImage(null);
      navigate(`/all-posts/city/${selectedCity}`);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group flex items-center">
            <label htmlFor="city" className="w-1/4 text-sm font-medium text-gray-700">City:</label>
            <input
              id="city"
              type="text"
              name="city"
              value={city}
              readOnly
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          {[
            { id: "title", type: "text", label: "Title", value: title, setValue: setTitle },
            { id: "content", type: "textarea", label: "Content", value: content, setValue: setContent },
            { id: "author", type: "text", label: "Author", value: author, setValue: setAuthor },
            { id: "createdAt", type: "text", label: "Created on", value: createdAt, setValue: setCreatedAt },
            { id: "contactInfo", type: "text", label: "Contact Info (optional)", value: contactInfo, setValue: setContactInfo },
          ].map(({ id, type, label, value, setValue }) => (
            <div key={id} className="form-group flex items-center">
              <label htmlFor={id} className="w-1/4 text-sm font-medium text-gray-700">{label}:</label>
              {type === "textarea" ? (
                <textarea
                  id={id}
                  name={id}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              ) : (
                <input
                  id={id}
                  type={type}
                  name={id}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              )}
            </div>
          ))}
          <div className="form-group flex items-center">
            <label htmlFor="image" className="w-1/4 text-sm font-medium text-gray-700">Upload Image:</label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;

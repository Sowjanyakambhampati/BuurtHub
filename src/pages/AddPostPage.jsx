import React, { useState, useContext } from "react";
import axios from "axios";
import { CityContext } from "../context/CityContext";
import { useNavigate } from 'react-router-dom';
import SideNav from '../components/SideNav';

function AddPost({ onAddPost }) {
  const { selectedCity } = useContext(CityContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    city: '',
    title: '',
    content: '',
    author: '',
    createdAt: '',
    contactInfo: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setPost((prevPost) => ({
      ...prevPost,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("city", post.city);
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("author", post.author);
    formData.append("createdAt", post.createdAt);
    formData.append("contactInfo", post.contactInfo);
    if (post.image) {
      formData.append("image", post.image);
    }

    try {
      const response = await axios.post("http://localhost:5005/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onAddPost(response.data);
      setPost({
        city: '',
        title: '',
        content: '',
        author: '',
        createdAt: '',
        contactInfo: '',
        image: null,
      });
      navigate(`/posts/${selectedCity}`);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-4">Create a Post in {selectedCity}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "city", type: "text", label: "City", value: post.title },
            { id: "title", type: "text", label: "Title", value: post.title },
            { id: "content", type: "textarea", label: "Content", value: post.content },
            { id: "author", type: "text", label: "Author", value: post.author },
            { id: "createdAt", type: "text", label: "Created on", value: post.createdAt },
            { id: "contactInfo", type: "text", label: "Contact Info (optional)", value: post.contactInfo },
          ].map(({ id, type, label, value }) => (
            <div key={id} className="form-group flex items-center">
              <label htmlFor={id} className="w-1/4 text-sm font-medium text-gray-700">{label}:</label>
              {type === "textarea" ? (
                <textarea id={id} name={id} value={value} onChange={handleChange}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              ) : (
                <input id={id} type={type} name={id} value={value} onChange={handleChange}
                  className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              )}
            </div>
          ))}
          <div className="form-group flex items-center">
            <label htmlFor="image" className="w-1/4 text-sm font-medium text-gray-700">Upload Image:</label>
            <input id="image" name="image" type="file" onChange={handleImageChange} accept="image/*"
              className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <button type="submit"
            className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;

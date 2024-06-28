import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CityContext } from '../context/CityContext';
import SideNav from '../components/SideNav';

function AddPostPage() {
  const { selectedCity } = useContext(CityContext);
  const [post, setPost] = useState({
    city: selectedCity,
    title: '',
    content: '',
    image: null,
    author: '',
    createdAt: '',
    contactInfo: ''
  });

  const navigate = useNavigate();

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
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a form data object to handle the image upload
    const formData = new FormData();

    formData.append('id', post.id);
    formData.append('city', post.city);
    formData.append('title', post.title);
    formData.append('content', post.content);
    if (post.image) {
      formData.append('image', post.image);

    }
    formData.append('author', post.author);
    formData.append('createdAt', post.createdAt);
    formData.append('contactInfo', post.contactInfo);

    axios.post('http://localhost:5005/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
        .then(response => {
          console.log('Product submitted: ', response.data);
          // Reset form fields
          setPost({
            city: selectedCity,
            title: '',
            content: '',
            image: null,
            author: '',
            createdAt: '',
            contactInfo: ''
          });


          navigate('/all-posts/city/${selectedCity}');
        })
        .catch(error => {
          console.error('There was an error submitting the Post!', error);
        });

  };

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 text-left">City:</label>
            <input
                type="text"
                id="city"
                name="city"
                value={post.city}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 text-left">Title: </label>
            <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 text-left">Content: </label>
            <input
                type="text"
                id="content"
                name="content"
                value={post.content}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="author"
                   className="block text-sm font-medium text-gray-700 text-left">Author :</label>
            <textarea
                id="author"
                name="author"
                value={post.author}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 text-left">Contact Info:</label>
            <textarea
                id="contactInfo"
                name="contactInfo"
                value={post.contactInfo}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700 text-left">createdAt</label>
            <textarea
                id="createdAt"
                name="createdAt"
                value={post.createdAt}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 text-left">Image:</label>
            <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <button
              type="submit"
              className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

          >
            Submit
          </button>
        </form>


        {/*<form onSubmit={handleSubmit} className="space-y-4">*/}
        {/*  <div className="form-group flex items-center">*/}
        {/*    <label htmlFor="city" className="w-1/4 text-sm font-medium text-gray-700">City:</label>*/}
        {/*    <input*/}
        {/*      id="city"*/}
        {/*      type="text"*/}
        {/*      name="city"*/}
        {/*      value={city}*/}
        {/*      readOnly*/}
        {/*      className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  {[*/}
        {/*    { id: "title", type: "text", label: "Title", value: title, setValue: setTitle },*/}
        {/*    { id: "content", type: "textarea", label: "Content", value: content, setValue: setContent },*/}
        {/*    { id: "author", type: "text", label: "Author", value: author, setValue: setAuthor },*/}
        {/*    { id: "createdAt", type: "text", label: "Created on", value: createdAt, setValue: setCreatedAt },*/}
        {/*    { id: "contactInfo", type: "text", label: "Contact Info (optional)", value: contactInfo, setValue: setContactInfo },*/}
        {/*  ].map(({ id, type, label, value, setValue }) => (*/}
        {/*    <div key={id} className="form-group flex items-center">*/}
        {/*      <label htmlFor={id} className="w-1/4 text-sm font-medium text-gray-700">{label}:</label>*/}
        {/*      {type === "textarea" ? (*/}
        {/*        <textarea*/}
        {/*          id={id}*/}
        {/*          name={id}*/}
        {/*          value={value}*/}
        {/*          onChange={(e) => setValue(e.target.value)}*/}
        {/*          className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"*/}
        {/*        />*/}
        {/*      ) : (*/}
        {/*        <input*/}
        {/*          id={id}*/}
        {/*          type={type}*/}
        {/*          name={id}*/}
        {/*          value={value}*/}
        {/*          onChange={(e) => setValue(e.target.value)}*/}
        {/*          className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"*/}
        {/*        />*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*  <div className="form-group flex items-center">*/}
        {/*    <label htmlFor="image" className="w-1/4 text-sm font-medium text-gray-700">Upload Image:</label>*/}
        {/*    <input*/}
        {/*      id="image"*/}
        {/*      type="file"*/}
        {/*      onChange={(e) => setImage(e.target.files[0])}*/}
        {/*      className="w-3/4 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <button*/}
        {/*    type="submit"*/}
        {/*    className="w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"*/}
        {/*  >*/}
        {/*    Submit*/}
        {/*  </button>*/}
        {/*</form>*/}
      </div>
    </div>
  );
};

export default AddPostPage;

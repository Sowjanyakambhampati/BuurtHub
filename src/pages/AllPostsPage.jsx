import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import SideNav from "../components/SideNav";
import { CityContext } from '../context/CityContext';


function AllPostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedCity } = useContext(CityContext);
  const { city } = useParams();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/posts/city/${city}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [city]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">All Posts From The Community in {selectedCity}</h2>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-3/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400"
          />
          <Link
            to={`/city/${selectedCity}/add-post`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add New Post
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-2">{post.author}</p>
                  <p className="text-gray-600 mb-2">{post.content}</p>
                  
                <p className="text-gray-600 mb-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-600 mb-2">Contact me on {post.contactInfo}</p>
                  <img className="w-full h-40 object-cover mb-2" src={post.image} alt={post.title} />
                </div>
            ))
          ) : (
            <p>No posts found for {selectedCity}.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllPostsPage;

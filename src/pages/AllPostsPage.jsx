import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SideNav from "../components/SideNav";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://community-forum-backend.adaptable.app/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

        <h2 className="text-2xl font-bold">All Posts From The Community</h2>
        <div className="flex justify-end items-center mb-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-64 p-2 border border-gray-300 rounded mr-4"
            />
            <Link
              to={'/usercitypage/:add-post'}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add New Post
            </Link>
          </div>
        </div>
        <ul className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <li key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center mb-2">
                  <img src={post.profilePicture} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                  <p className="text-lg font-semibold">{post.title}</p>
                </div>
                <p className="text-gray-700 mb-2">{post.content}</p>
                <p className="text-gray-700 mb-2">{post.author}</p>
                <p className="text-gray-700 mb-2">{new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-700 mb-2">{post.contactInfo}</p>
              </li>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PostsPage;

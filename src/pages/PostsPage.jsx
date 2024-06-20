import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from "../components/SideNav";

function PostsPage() {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <ul className="space-y-4">
          {posts.map((post) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostsPage;

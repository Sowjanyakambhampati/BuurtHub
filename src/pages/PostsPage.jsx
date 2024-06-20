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

  const handleLike = async (id) => {
    try {
      await axios.patch(`https://community-forum-backend.adaptable.app/posts/${id}/like`);
      // Refresh the list of posts after liking
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNav />
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <ul className="space-y-4">
          {posts.map((posts) => (
            <li key={post._id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold mb-2">{posts.title}</p>
              <p className="text-gray-700 mb-2">{posts.content}</p>
              <p className="text-gray-700 mb-2">{posts.author}</p>
              <p className="text-gray-700 mb-2">{posts.createdAt}</p>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostsPage;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';
import { CityContext } from '../context/CityContext';

function UserDashboard({ session }) {
    const [userProducts, setUserProducts] = useState([]);
    const [reservedProducts, setReservedProducts] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [editPost, setEditPost] = useState(null);
    const { selectedCity } = useContext(CityContext);

    const { user } = session;

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await axios.get(`https://community-forum-backend.adaptable.app/product/productowner/${user.id}`);
                setUserProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchUserProducts();
    }, [user.id]);

    useEffect(() => {
        const fetchUserReservedProducts = async () => {
            try {
                const response = await axios.get(`https://community-forum-backend.adaptable.app/product/reservedproducts/${user.id}`);
                setReservedProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchUserReservedProducts();
    }, [user.id]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5005/posts/postauthor/${user.id}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error('Failed to fetch posts', error);
            }
        };
        fetchUserPosts();
    }, [user.id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePostEditChange = (e) => {
        const { name, value } = e.target;
        setEditPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://community-forum-backend.adaptable.app/product/${editProduct._id}`, editProduct);
            toast.success('Product updated successfully');
            setUserProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === editProduct._id ? response.data : product
                )
            );
            setEditProduct(null);
        } catch (error) {
            toast.error('Failed to update product');
            console.error('Failed to update product', error);
        }
    };

    const handlePostEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5005/posts/postauthor/${editPost._id}`, editPost);
            toast.success('Post updated successfully');
            setUserPosts(prevPosts =>
                prevPosts.map(post =>
                    post._id === editPost._id ? response.data : post
                )
            );
            setEditPost(null);
        } catch (error) {
            toast.error('Failed to update post');
            console.error('Failed to update post', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`https://community-forum-backend.adaptable.app/product/${productId}`);
            toast.success('Product deleted successfully');
            setUserProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        } catch (error) {
            toast.error('Failed to delete product');
            console.error('Failed to delete product', error);
        }
    };

    const handlePostDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:5005/posts/postauthor/${postId}`);
            toast.success('Post deleted successfully');
            setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            toast.error('Failed to delete post');
            console.error('Failed to delete post', error);
        }
    };

    return (
        <div className="flex">
            <ToastContainer />
            <div className="w-1/4">
                <SideNav />
            </div>
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">My Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {userProducts.length > 0 ? (
                            userProducts.map(product => (
                                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md relative">
                                    {editProduct && editProduct._id === product._id ? (
                                        <form onSubmit={handleEditSubmit} className="space-y-4">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">Name:</label>
                                                <input
                                                    name="productName"
                                                    value={editProduct.productName}
                                                    onChange={handleEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">Description:</label>
                                                <textarea
                                                    name="description"
                                                    value={editProduct.description}
                                                    onChange={handleEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">Price:</label>
                                                <input
                                                    name="price"
                                                    type="number"
                                                    value={editProduct.price}
                                                    onChange={handleEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">Category:</label>
                                                <select
                                                    name="category"
                                                    value={editProduct.category}
                                                    onChange={handleEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Select a category</option>
                                                    <option value="Furniture">Furniture</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Utensils">Utensils</option>
                                                    <option value="Clothing">Clothing</option>
                                                    <option value="Kids">Kids</option>
                                                    <option value="Pet Care">Pet Care</option>
                                                    <option value="Entertainment">Entertainment</option>
                                                    <option value="Sports">Sports</option>
                                                    <option value="Appliances">Appliances</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">Condition:</label>
                                                <select
                                                    name="condition"
                                                    value={editProduct.condition}
                                                    onChange={handleEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Select a condition</option>
                                                    <option value="New">New</option>
                                                    <option value="Very Good">Very Good</option>
                                                    <option value="Good">Good</option>
                                                    <option value="Satisfactory">Satisfactory</option>
                                                </select>
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditProduct(null)}
                                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <h4 className="text-lg font-semibold mb-2">{product.productName}</h4>
                                            <p className="text-gray-600 mb-2">Price: €{product.price}</p>
                                            <p className="text-gray-600 mb-2">Description: {product.description}</p>
                                            <p className="text-gray-600 mb-2">Category: {product.category}</p>
                                            <p className="text-gray-600 mb-2">Condition: {product.condition}</p>
                                            {product.image && (
                                                <img src={product.image} alt={product.productName} className="mt-4 rounded-md"
                                                    style={{ maxWidth: '100%', height: 'auto' }} />
                                            )}
                                            <div className="absolute bottom-4 left-4 flex space-x-2">
                                                <button
                                                    onClick={() => setEditProduct(product)}
                                                    className="py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No products added by you.</p>
                        )}
                    </div>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Reserved Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {reservedProducts.length > 0 ? (
                            reservedProducts.map(product => (
                                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold mb-2">{product.productName}</h4>
                                    <p className="text-gray-600 mb-2">Price: €{product.price}</p>
                                    <p className="text-gray-600 mb-2">Description: {product.description}</p>
                                    <p className="text-gray-600 mb-2">Category: {product.category}</p>
                                    <p className="text-gray-600 mb-2">Condition: {product.condition}</p>
                                    {product.image && (
                                        <img src={product.image} alt={product.productName} className="mt-4 rounded-md"
                                            style={{ maxWidth: '100%', height: 'auto' }} />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No reserved products.</p>
                        )}
                    </div>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Registered Events</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {registeredEvents.length > 0 ? (
                            registeredEvents.map(event => (
                                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold mb-2">{event.name}</h4>
                                    <p className="text-gray-600 mb-2">{event.date}</p>
                                    <p className="text-gray-600 mb-2">{event.location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No registered events.</p>
                        )}
                    </div>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Your Posts</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <div key={post._id} className="bg-white p-4 rounded-lg shadow-md relative">
                                    {editPost && editPost._id === post._id ? (
                                        <form onSubmit={handlePostEditSubmit} className="space-y-4">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">Title:</label>
                                                <input
                                                    name="title"
                                                    value={editPost.title}
                                                    onChange={handlePostEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="block text-sm font-medium text-gray-700">Content:</label>
                                                <textarea
                                                    name="content"
                                                    value={editPost.content}
                                                    onChange={handlePostEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditPost(null)}
                                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <h4 className="text-lg font-semibold mb-2">Title:{post.title}</h4>
                                            <p className="text-gray-600 mb-2">Content: {post.content}</p>
                                            <p className="text-gray-600 mb-2">{post.contactInfo}</p>
                                            {post.image && (
                                                <img src={post.image} alt={post.title} className="mt-4 rounded-md"
                                                    style={{ maxWidth: '100%', height: 'auto' }} />
                                            )}
                                            <div className="absolute bottom-4 left-4 flex space-x-2">
                                                <button
                                                    onClick={() => setEditPost(post)}
                                                    className="py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handlePostDelete(post._id)}
                                                    className="py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No posts added by you.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default UserDashboard;

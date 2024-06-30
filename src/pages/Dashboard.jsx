import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';
import {CityContext} from '../context/CityContext';

function UserDashboard({session}) {
    const [userProducts, setUserProducts] = useState([]);
    const [reservedProducts, setReservedProducts] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const {selectedCity} = useContext(CityContext);

    const {user} = session;
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
                const response = await axios.get(`http://localhost:5005/product/reservedproducts/${user.id}`);
                setReservedProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchUserReservedProducts();
    }, [user.id]);



    return (
        <div className="flex">
            <ToastContainer/>
            <div className="w-1/4">
                <SideNav/>
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
                                                    name="name"
                                                    value={editProduct.name}
                                                    onChange={handleEditChange}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    className="block text-sm font-medium text-gray-700">Description:</label>
                                                <textarea
                                                    name="description"
                                                    value={editProduct.description}
                                                    onChange={handleEditChange}
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
                                                onClick={() => setEditProduct(null)}
                                                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <>
                                            <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                                            <p className="text-gray-600 mb-2">{product.description}</p>
                                            {product.image && (
                                                <img src={product.image} alt={product.name} className="mt-4 rounded-md"
                                                     style={{maxWidth: '100%', height: 'auto'}}/>
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
                    <h3 className="text-xl font-semibold mb-2">Products Reserved by You</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {reservedProducts.length > 0 ? (
                            reservedProducts.map(product => (
                                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                                    <p className="text-gray-600 mb-2">{product.description}</p>
                                    {product.image && (
                                        <img src={product.image} alt={product.name} className="mt-4 rounded-md"
                                             style={{maxWidth: '100%', height: 'auto'}}/>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No products reserved by you.</p>
                        )}
                    </div>
                </section>

                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">Events Registered by You</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {registeredEvents.length > 0 ? (
                            registeredEvents.map(event => (
                                <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
                                    <p className="text-gray-600 mb-2">{event.description}</p>
                                    <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                                    <p className="text-gray-600 mb-2">City: {event.city}</p>
                                    <p className="text-gray-600 mb-2">Location: {event.location}</p>
                                    <p className="text-gray-600 mb-2">Organiser: {event.organiser}</p>
                                    {event.image && (
                                        <img src={event.image} alt={event.title} className="mt-4 rounded-md"
                                             style={{maxWidth: '100%', height: 'auto'}}/>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No events registered by you.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-2">Your Posts</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {userPosts.length > 0 ? (
                            userPosts.map(post => (
                                <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
                                    <p className="text-gray-600 mb-2">{post.content}</p>
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

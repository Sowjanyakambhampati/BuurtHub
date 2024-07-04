import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams, useLocation, Navigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNav from '../components/SideNav';
import GoogleMap from '../components/GoogleMap'; // Assuming you have a GoogleMap component
const EventDetailsPage = () => {
    const {eventId} = useParams();
    const location = useLocation();
    const session = location.state?.session;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentParticipants, setCurrentParticipants] = useState([]);
    const {user} = session;

    useEffect(() => {
        if (!session) {
            return;
        }
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5005/event/${eventId}`);
                setEvent(response.data);
                setCurrentParticipants(response.data.participants);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch event details', error);
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [eventId, session]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const confirmRegister = window.confirm("Do you want to register for this Event?");

        if (confirmRegister) {
            console.log('Register EVENT ID :: ' + user.id);
            const updateData = {
                participants: Array.isArray(currentParticipants) ? [...currentParticipants, user.id] : [user.id],
            };
            try {
                await axios.put(`http://localhost:5005/event/register/${eventId}`, updateData);
                toast.success('Successfully registered for the event');
            } catch (error) {
                console.error('Failed to register for event', error);
                toast.error('Failed to register for event');
            }
        }

    };
    if (!session) {
        return <Navigate to="/login"/>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        toast.error(error);
        return <div>Error loading event details</div>;
    }
    if (!event) {
        return <div>No event found</div>;
    }
    const {
        title,
        description,
        date,
        time,
        city,
        address,
        locationUrl,
        organiser,
        price,
        category,
        image,
        location: eventLocation
    } = event;
    const hasLocation = eventLocation && eventLocation.coordinates && eventLocation.coordinates.latitude && eventLocation.coordinates.longitude;
    return (
        <div className="flex">
            <ToastContainer/>
            <div className="w-1/4">
                <SideNav/>
            </div>
            <div className="w-3/4 p-4">
                <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                <div className="flex">
                    <div className="w-1/3">
                        {event.image && (
                            <img className="w-full h-100 object-cover mb-4" src={event.image} alt={event.title}/>
                        )}
                    </div>
                    <div className="w-2/3 pl-4">
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-2">Time: {event.time}</p>
                        <p className="text-gray-600 mb-2">City: {event.city}</p>
                        <p className="text-gray-600 mb-2">Address: {event.address}</p>
                        <p className="text-gray-600 mb-2">Location: <a href={event.locationUrl} target="_blank"
                                                                       rel="noopener noreferrer">{event.locationUrl}</a>
                        </p>
                        <p className="text-gray-600 mb-2">Organiser: {event.organiser}</p>
                        <p className="text-gray-600 mb-2">Price: {event.price}</p>
                        <p className="text-gray-600 mb-2">Category: {event.category}</p>
                        <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded-md">Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EventDetailsPage;

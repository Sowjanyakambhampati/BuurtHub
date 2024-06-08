import React, { useState } from 'react';
import axios from 'axios';
const EventRegistration = ({ eventId }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    contactNumber: '',
    email: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/events/${eventId}/register`, formData);
      alert('Registration successful');
      // Optionally, you can redirect the user to another page after successful registration
    } catch (error) {
      console.error('Error registering for event:', error);
      alert('Registration failed. Please try again.');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required /><br />
      {/* Other input fields for last name, age, contact number, and email */}
      <button type="submit">Register</button>
    </form>
  );
};
export default EventRegistration;
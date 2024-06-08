
import React from 'react';
import EventRegistrationForm from './EventRegistrationForm';
const EventDetailsPage = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      {/* Display other event details */}
      <EventRegistrationForm eventId={event._id} />
    </div>
  );
};
export default EventDetailsPage;
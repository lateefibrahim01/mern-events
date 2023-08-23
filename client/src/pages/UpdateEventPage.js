import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateEventForm from '../components/UpdateEventForm';

function UpdateEventPage() {
  const { id } = useParams();
  const events = useSelector((state) => state.event.events);
  const eventToUpdate = events.find((event) => event._id === id);

  if (!eventToUpdate) {
    return <p className="text-center text-red-500">Event not found.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">Update Event</h1>
      <UpdateEventForm eventId={id} initialData={eventToUpdate} />
    </div>
  );
}

export default UpdateEventPage;

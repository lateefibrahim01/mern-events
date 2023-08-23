import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEvent } from '../redux/eventSlice';

function UpdateEventForm({ eventId, initialData }) {
  const [name, setName] = useState(initialData.name);
  const [location, setLocation] = useState(initialData.location);
  const [event, setEvent] = useState(initialData.event);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEvent({ eventId, eventData: { name, location, event } }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Event:</label>
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update
      </button>
    </form>
  );
}

export default UpdateEventForm;

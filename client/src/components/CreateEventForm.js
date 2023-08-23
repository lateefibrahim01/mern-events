import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../redux/eventSlice';

function CreateEventForm() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [event, setEvent] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent({ name, location, event }));
    // Clear form fields after submission
    setName('');
    setLocation('');
    setEvent('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Event:</label>
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Create
      </button>
    </form>
  );
}

export default CreateEventForm;

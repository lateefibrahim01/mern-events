import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, deleteEvent } from '../redux/eventSlice';

function EventList() {
  const { events, isLoading, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(eventId));
    }
  };

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li
              key={event._id}
              className="py-4 px-6 border-b border-gray-300 last:border-b-0 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{event.name}</h3>
                <p className="text-gray-600">Location: {event.location}</p>
                <p className="text-gray-600">Event: {event.event}</p>
              </div>
              <div>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
                {/* Add an Edit button to navigate to the UpdateEventPage for updating this event */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;

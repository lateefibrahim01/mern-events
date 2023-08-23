import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteEvent } from '../redux/eventSlice';

function EventListItem({ event }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteEvent = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(event._id));
    }
  };

  const handleEditEvent = () => {
    history.push(`/update-event/${event._id}`);
  };

  return (
    <li className="py-4 px-6 border-b border-gray-300 last:border-b-0 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{event.name}</h3>
        <p className="text-gray-600">Location: {event.location}</p>
        <p className="text-gray-600">Event: {event.event}</p>
      </div>
      <div>
        <button
          onClick={handleDeleteEvent}
          className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg mr-2 hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={handleEditEvent}
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Edit
        </button>
      </div>
    </li>
  );
}

export default EventListItem;

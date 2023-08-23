import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventList from '../components/EventList';
import CreateEventForm from '../components/CreateEventForm';

function EventsPage() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <p className="text-center text-red-500 mt-8">Please log in to view events.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Events Page</h1>
      <CreateEventForm />
      <EventList />
    </div>
  );
}

export default EventsPage;

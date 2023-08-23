import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import LoginPage from './LoginPage';
import EventPage from './EventPage';
import ProtectedRoute from './ProtectedRoute';
import { updateEvent, deleteEvent } from './eventSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('newEvent', (event) => {
      console.log('New event received:', event);
      dispatch(updateEvent(event));
    });

    socket.on('updateEvent', (event) => {
      console.log('Event updated:', event);
      dispatch(updateEvent(event));
    });

    socket.on('deleteEvent', (eventId) => {
      console.log('Event deleted:', eventId);
      dispatch(deleteEvent(eventId));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          {/* ... (previous code) */}
          <ProtectedRoute exact path="/events" component={EventPage} />
          {/* Other routes */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;

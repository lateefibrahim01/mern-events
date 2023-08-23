import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your backend server URL

// Async thunk to fetch events from the backend
export const fetchEvents = createAsyncThunk('event/fetchEvents', async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/events`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async thunk to create an event on the backend
export const createEvent = createAsyncThunk('event/createEvent', async (eventData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/events`, eventData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async thunk to update an event on the backend
export const updateEvent = createAsyncThunk('event/updateEvent', async ({ eventId, eventData }) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

// Async thunk to delete an event on the backend
export const deleteEvent = createAsyncThunk('event/deleteEvent', async (eventId) => {
  try {
    await axios.delete(`${BASE_URL}/api/events/${eventId}`);
    return eventId;
  } catch (error) {
    throw error.response.data;
  }
});

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const updatedEvent = action.payload;
        state.events = state.events.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        );
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        const deletedEventId = action.payload;
        state.events = state.events.filter((event) => event._id !== deletedEventId);
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default eventSlice.reducer;

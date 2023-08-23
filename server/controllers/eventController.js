const Event = require('../models/Event');
const { sendEventNotification } = require('../sockets/eventNotifications');

async function createEvent(req, res) {
  const { name, location, event } = req.body;
  const createdBy = req.user._id; // Assuming you attached the authenticated user object in the authMiddleware

  try {
    const newEvent = new Event({
      name,
      location,
      event,
      createdBy,
    });

    await newEvent.save();

    // Send event notification to connected clients using Socket.IO
    sendEventNotification({ type: 'event-created', eventData: newEvent });

    return res.status(201).json(newEvent);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create the event.' });
  }
}

async function readEvents(req, res) {
  try {
    const events = await Event.find().sort('-createdAt');

    return res.json(events);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch events.' });
  }
}

async function updateEvent(req, res) {
  const { name, location, event } = req.body;

  try {
    const eventToUpdate = await Event.findById(req.params.id);

    if (!eventToUpdate) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // Check if the authenticated user is the creator of the event
    if (eventToUpdate.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You are not authorized to update this event.' });
    }

    eventToUpdate.name = name;
    eventToUpdate.location = location;
    eventToUpdate.event = event;

    await eventToUpdate.save();

    // Send event notification to connected clients using Socket.IO
    sendEventNotification({ type: 'event-updated', eventData: eventToUpdate });

    return res.json(eventToUpdate);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update the event.' });
  }
}

async function deleteEvent(req, res) {
  try {
    const eventToDelete = await Event.findById(req.params.id);

    if (!eventToDelete) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // Check if the authenticated user is the creator of the event
    if (eventToDelete.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this event.' });
    }

    await eventToDelete.remove();

    // Send event notification to connected clients using Socket.IO
    sendEventNotification({ type: 'event-deleted', eventId: eventToDelete._id });

    return res.json({ message: 'Event deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete the event.' });
  }
}

module.exports = {
  createEvent,
  readEvents,
  updateEvent,
  deleteEvent,
};

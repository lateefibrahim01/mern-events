const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Add any other fields relevant to your event model
  // For example, fields for event date, tags, etc.
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

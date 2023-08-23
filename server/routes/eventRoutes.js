const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createEvent,
  readEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const router = express.Router();

// Route to create a new event
router.post('/events', authMiddleware, createEvent);

// Route to read all events
router.get('/events', authMiddleware, readEvents);

// Route to update an existing event
router.put('/events/:id', authMiddleware, updateEvent);

// Route to delete an event
router.delete('/events/:id', authMiddleware, deleteEvent);

module.exports = router;

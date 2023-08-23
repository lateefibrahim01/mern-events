const { getIo } = require('./socketHandler');

function sendEventNotification(eventData) {
  const io = getIo();

  // Emit the event notification to all connected clients
  io.emit('event-notification', eventData);
}

module.exports = {
  sendEventNotification,
};

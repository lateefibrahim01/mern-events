const socketIo = require('socket.io');

let io;

function initialize(server) {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error('Socket.IO is not initialized. Please call initialize() first.');
  }
  return io;
}

module.exports = {
  initialize,
  getIo,
};

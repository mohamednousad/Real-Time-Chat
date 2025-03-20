const socketio = require('socket.io');

let io;

const initSocket = (server) => {
  io = socketio(server, {
    cors: {
      origin: '*', // Allow all origins (update to your frontend URL in production)
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Join a room
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId); // Join the specified room
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });
  
    // Chat message event
    socket.on('send_message', ({ roomId, message }) => {
      console.log('Received message:', message); // Log the message in the backend
      io.to(roomId).emit('message', message); // Broadcast message to the room
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

module.exports = { initSocket, getIO };
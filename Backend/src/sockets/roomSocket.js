const roomSocket = (io, socket, rooms) => {
  const joinRoom = ({ roomId, user }) => {
    socket.join(roomId);
    socket.data.roomId = roomId; // Store roomId on socket for disconnect handling

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    const participant = { id: socket.id, username: user.username };
    rooms[roomId].push(participant);
    
    socket.to(roomId).emit('user:joined', { userId: socket.id, user });
    io.to(roomId).emit('room:participants', rooms[roomId]);

    socket.on('webrtc:offer', ({ to, offer }) => {
      io.to(to).emit('webrtc:offer', { from: socket.id, offer });
    });

    socket.on('webrtc:answer', ({ to, answer }) => {
      io.to(to).emit('webrtc:answer', { from: socket.id, answer });
    });
    
    socket.on('webrtc:ice-candidate', ({ to, candidate }) => {
      io.to(to).emit('webrtc:ice-candidate', { from: socket.id, candidate });
    });
  };
  
  const leaveRoom = ({ roomId }) => {
    socket.leave(roomId);
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter(p => p.id !== socket.id);
      io.to(roomId).emit('room:participants', rooms[roomId]);
    }
    socket.to(roomId).emit('user:left', { userId: socket.id });
  };

  socket.on('room:join', joinRoom);
  socket.on('room:leave', leaveRoom);
};

module.exports = roomSocket;
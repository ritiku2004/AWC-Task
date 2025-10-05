// tldraw is very efficient and handles its own state.
// The backend just needs to broadcast updates to other clients in the room.

const whiteboardSocket = (io, socket) => {
  // A generic event handler for any tldraw update
  const handleTldrawUpdate = (data) => {
    const { roomId, update } = data;
    if (roomId) {
      // Broadcast the update to everyone else in the room
      socket.to(roomId).emit('tldraw:update', update);
    }
  };
  
  // No need for separate draw, shape, clear events anymore.
  socket.on('tldraw:update', handleTldrawUpdate);
};

module.exports = whiteboardSocket;
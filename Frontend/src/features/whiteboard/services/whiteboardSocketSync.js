// Placeholder for a class-based approach to socket communication for the whiteboard.
// This provides a more structured way to handle events, which can be useful for testing
// and for very complex features. For this project, direct socket usage is sufficient.

class WhiteboardSocketSync {
  constructor(socket) {
    this.socket = socket;
  }

  emitDraw(drawData) {
    this.socket.emit('whiteboard:draw', drawData);
  }

  onDraw(callback) {
    this.socket.on('whiteboard:drawing', callback);
  }

  emitClear(roomId) {
    this.socket.emit('whiteboard:clear', { roomId });
  }
  
  onClear(callback) {
    this.socket.on('whiteboard:clear', callback);
  }

  cleanup() {
    this.socket.off('whiteboard:drawing');
    this.socket.off('whiteboard:clear');
  }
}

export default WhiteboardSocketSync;
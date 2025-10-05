const mongoose = require('mongoose');

const whiteboardSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    ref: 'Room',
    field: 'roomId',
  },
  // Store drawing events as an array for playback functionality
  events: [{
    type: Object,
  }],
  // Store the final state as a base64 image for quick loading
  snapshot: {
    type: String,
  },
}, {
  timestamps: true,
});

const Whiteboard = mongoose.model('Whiteboard', whiteboardSchema);
module.exports = Whiteboard;
// Placeholder for future logic, like saving data via repository
const whiteboardRepository = require('../repositories/whiteboard.repository');

const saveSnapshot = async (roomId, snapshotData) => {
  return whiteboardRepository.updateSnapshot(roomId, snapshotData);
};

const addDrawingEvent = async (roomId, eventData) => {
  return whiteboardRepository.addEvent(roomId, eventData);
};

module.exports = {
  saveSnapshot,
  addDrawingEvent,
};
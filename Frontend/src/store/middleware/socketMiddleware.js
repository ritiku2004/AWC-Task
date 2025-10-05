import { addMessage } from '../slices/chatSlice';
import { updateParticipants } from '../slices/roomSlice';

const socketMiddleware = (store) => {
  let socket;

  return (next) => (action) => {
    if (socket) {
      socket.on('chat:message', (message) => {
        store.dispatch(addMessage(message));
      });
      socket.on('room:participants', (participants) => {
        store.dispatch(updateParticipants(participants));
      });
    }

    return next(action);
  };
};

export default socketMiddleware;
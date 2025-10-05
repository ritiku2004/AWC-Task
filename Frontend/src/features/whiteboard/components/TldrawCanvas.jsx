import { Tldraw, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';
import { useSocket } from '../../../context/SocketProvider';
import { useEffect } from 'react';

// This component wraps the Tldraw editor and connects it to our sockets.
const MultiplayerEditor = ({ roomId }) => {
  const editor = useEditor();
  const socket = useSocket();

  useEffect(() => {
    if (!editor || !socket) return;

    // A flag to prevent sending updates that we received from the server back to the server.
    let isRemoteUpdate = false;

    // 1. Send local changes to the server.
    const handleChange = (change) => {
      if (change.source !== 'user') return;
      if (isRemoteUpdate) return;
      socket.emit('tldraw:update', { roomId, update: change });
    };

    // 2. Receive remote changes from the server and apply them.
    const handleRemoteUpdate = (change) => {
      isRemoteUpdate = true;
      try {
        editor.store.merge(change.changes);
      } catch (e) {
        console.error("Failed to apply remote change:", e);
      }
      isRemoteUpdate = false;
    };

    // 3. Handle history from users who joined before us.
    // We request the full document from the server when we join.
    const handleHistory = (document) => {
        isRemoteUpdate = true;
        editor.store.load(document);
        isRemoteUpdate = false;
    }

    editor.on('change', handleChange);
    socket.on('tldraw:update', handleRemoteUpdate);
    socket.on('whiteboard:history', handleHistory);

    // When this component loads, ask the server for the latest document state.
    socket.emit('whiteboard:join', { roomId });

    return () => {
      editor.off('change', handleChange);
      socket.off('tldraw:update', handleRemoteUpdate);
      socket.off('whiteboard:history', handleHistory);
    };
  }, [editor, socket, roomId]);

  return null; // This component only handles logic, not rendering.
};


const TldrawCanvas = ({ roomId }) => {
  return (
    <div className="w-full h-full">
      <Tldraw persistenceKey={roomId} autoFocus>
        <MultiplayerEditor roomId={roomId} />
      </Tldraw>
    </div>
  );
};

export default TldrawCanvas;
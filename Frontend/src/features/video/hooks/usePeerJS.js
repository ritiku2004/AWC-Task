import { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { useSocket } from '../../../context/SocketProvider';

export const usePeerJS = (roomId, user, localStream) => {
  const socket = useSocket();
  const peerRef = useRef(null);
  const [peers, setPeers] = useState({});

  useEffect(() => {
    if (!socket || !localStream || !user) return;

    // This is the updated configuration to fix the 404 error
    const peer = new Peer(user.id, {
      host: '/', // Use root host
      port: window.location.port, // Use the same port as the frontend
      path: '/peerjs/myapp', // The path we configured in Express
    });
    peerRef.current = peer;

    peer.on('open', (peerId) => {
      socket.emit('room:join', { roomId, user });
    });

    peer.on('call', (call) => {
      call.answer(localStream);
      call.on('stream', (remoteStream) => {
        setPeers(prev => ({
          ...prev,
          [call.peer]: { call, stream: remoteStream, user: { id: call.peer } }
        }));
      });
    });

    const handleNewUser = ({ user: newUser }) => {
      if (newUser.id === user.id) return;
      const call = peer.call(newUser.id, localStream);
      call.on('stream', (remoteStream) => {
        setPeers(prev => ({
          ...prev,
          [newUser.id]: { call, stream: remoteStream, user: newUser }
        }));
      });
    };

    const handleUserLeft = ({ userId }) => {
      if (peers[userId]) {
        peers[userId].call.close();
      }
      setPeers(prev => {
        const newPeers = { ...prev };
        delete newPeers[userId];
        return newPeers;
      });
    };

    socket.on('user:joined', handleNewUser);
    socket.on('user:left', handleUserLeft);

    return () => {
      socket.off('user:joined', handleNewUser);
      socket.off('user:left', handleUserLeft);
      peer.destroy();
    };
  }, [socket, roomId, user, localStream]);

  const toggleMediaTrack = (kind, enabled) => {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        if (track.kind === kind) {
          track.enabled = enabled;
        }
      });
    }
  };

  return { peers, toggleMediaTrack };
};

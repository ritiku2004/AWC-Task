import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import webRTCAdapter from '../services/webRTCAdapter';
import chatApi from '../../chat/services/chatApi';

const SOCKET_SERVER_URL = 'http://localhost:3001';

/**
 * Creates a robust dummy MediaStream with a silent audio track and a black video track.
 * This is compatible with WebRTC connections that expect tracks to be present.
 * @returns {MediaStream}
 */
const createDummyStream = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const dst = audioContext.createMediaStreamDestination();
    oscillator.connect(dst);
    oscillator.start();
    const audioTrack = dst.stream.getAudioTracks()[0];

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillRect(0, 0, 1, 1);
    }
    const videoStream = canvas.captureStream();
    const videoTrack = videoStream.getVideoTracks()[0];

    // Mute the tracks by default as a sensible starting state
    audioTrack.enabled = false;
    videoTrack.enabled = false;

    return new MediaStream([audioTrack, videoTrack]);
};


export const useWebRTC = (roomId, username) => {
    const [peers, setPeers] = useState({});
    const localStreamRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [isAudioMuted, setAudioMuted] = useState(true);
    const [isVideoOff, setVideoOff] = useState(true);

    const socketRef = useRef(null);
    const peerRef = useRef(null);
    const localVideoRef = useRef(null);
    const initialized = useRef(false);

    const addVideoStream = (videoRef, stream) => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    };

    const removePeer = useCallback((peerId) => {
        setPeers(prevPeers => {
            const newPeers = { ...prevPeers };
            if (newPeers[peerId]) {
                newPeers[peerId].call?.close();
                delete newPeers[peerId];
            }
            return newPeers;
        });
    }, []);

    const handleSendMessage = (message) => {
        const ownMessage = {
            message,
            username,
            timestamp: new Date().toLocaleTimeString(),
            id: `own-${Date.now()}`
        };
        setMessages(prev => [...prev, ownMessage]);
        chatApi(socketRef.current).sendMessage(roomId, message, username);
    };

    const toggleAudio = useCallback(() => {
        if (localStreamRef.current) {
            const audioTracks = localStreamRef.current.getAudioTracks();
            if (audioTracks.length > 0) {
                audioTracks[0].enabled = !audioTracks[0].enabled;
                setAudioMuted(!audioTracks[0].enabled);
            }
        }
    }, []);

    const toggleVideo = useCallback(async () => {
        if (!peerRef.current || !localStreamRef.current) return;
    
        const myPeerId = peerRef.current.id;
    
        if (isVideoOff) {
            // --- Turning video ON ---
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                const newVideoTrack = videoStream.getVideoTracks()[0];
    
                // If there's an old dummy video track, remove it first
                const oldVideoTrack = localStreamRef.current.getVideoTracks()[0];
                if (oldVideoTrack) {
                    localStreamRef.current.removeTrack(oldVideoTrack);
                }
    
                localStreamRef.current.addTrack(newVideoTrack);
                addVideoStream(localVideoRef, localStreamRef.current);
    
                // Update the track for all existing peer connections
                for (const peerId in peers) {
                    if (peers[peerId] && peers[peerId].call) {
                        const peerConnection = peers[peerId].call.peerConnection;
                        if (peerConnection) {
                            const sender = peerConnection.getSenders().find(s => s.track?.kind === 'video');
                            if (sender) {
                                sender.replaceTrack(newVideoTrack);
                            }
                        }
                    }
                }
                setVideoOff(false);
            } catch (err) {
                console.error("Failed to acquire camera:", err);
            }
        } else {
            // --- Turning video OFF ---
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.stop(); // This is the key change to release the camera
                localStreamRef.current.removeTrack(videoTrack);
    
                // Create a dummy track to replace the video and maintain the connection
                const dummyStream = createDummyStream();
                const dummyVideoTrack = dummyStream.getVideoTracks()[0];
                localStreamRef.current.addTrack(dummyVideoTrack);
    
                // Update all peer connections with the dummy track
                for (const peerId in peers) {
                     if (peers[peerId] && peers[peerId].call) {
                        const peerConnection = peers[peerId].call.peerConnection;
                        if (peerConnection) {
                            const sender = peerConnection.getSenders().find(s => s.track?.kind === 'video');
                            if (sender) {
                                sender.replaceTrack(dummyVideoTrack);
                            }
                        }
                    }
                }
                setVideoOff(true);
            }
        }
    }, [isVideoOff, peers]);

    useEffect(() => {
        if (initialized.current) {
            return;
        }
        initialized.current = true;

        const init = async () => {
            let stream = null;
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localStreamRef.current = stream;
                addVideoStream(localVideoRef, stream);
                setVideoOff(false);
                setAudioMuted(false);
            } catch (err) {
                console.warn("Could not get media stream. Using dummy stream.", err);
                stream = createDummyStream();
                localStreamRef.current = stream;
            }

            socketRef.current = io(SOCKET_SERVER_URL);
            const adapter = webRTCAdapter(socketRef.current);
            const chatHandler = chatApi(socketRef.current);

            const myPeer = new Peer(undefined, {
                host: 'localhost',
                port: 3002,
                path: '/peerjs'
            });
            peerRef.current = myPeer;

            myPeer.on('open', (userId) => {
                adapter.joinRoom(roomId, userId, username);
            });

            myPeer.on('call', (call) => {
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    setPeers(prev => ({
                        ...prev,
                        [call.peer]: { call, stream: remoteStream, username: call.metadata.username }
                    }));
                });
                call.on('close', () => removePeer(call.peer));
            });

            adapter.onUserConnected((userId, newUsername) => {
                const call = myPeer.call(userId, stream, { metadata: { username } });
                call.on('stream', (remoteStream) => {
                    setPeers(prev => ({
                        ...prev,
                        [userId]: { call, stream: remoteStream, username: newUsername }
                    }));
                });
                call.on('close', () => removePeer(userId));
            });

            adapter.onUserDisconnected((userId) => removePeer(userId));
            chatHandler.onReceiveMessage((messageData) => setMessages(prev => [...prev, messageData]));
        };

        init();

        return () => {
            console.log("Cleaning up connections.");
            localStreamRef.current?.getTracks().forEach(track => track.stop());
            socketRef.current?.disconnect();
            peerRef.current?.destroy();
            initialized.current = false;
        };
    }, [roomId, username, removePeer]);

    return {
        localVideoRef,
        peers,
        messages,
        handleSendMessage,
        isAudioMuted,
        isVideoOff,
        toggleAudio,
        toggleVideo
    };
};
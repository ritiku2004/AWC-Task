import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSocket } from "../../context/SocketProvider";
import { usePeerJS } from "../../features/video/hooks/usePeerJS";

import TldrawCanvas from "../../features/whiteboard/components/TldrawCanvas";
import RoomHeader from './RoomHeader';
import RoomFooter from './RoomFooter';
import SidePanel from '../../components/layout/SidePanel';
import Spinner from "../../components/ui/Spinner";

const RoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const socket = useSocket();
    const { user } = useSelector((state) => state.auth);

    const [localStream, setLocalStream] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicOn, setIsMicOn] = useState(true);
    const [participants, setParticipants] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panelView, setPanelView] = useState('participants');

    const { peers, toggleMediaTrack } = usePeerJS(roomId, user, localStream);

    useEffect(() => {
        if (window.innerWidth >= 768) {
            setIsPanelOpen(true);
        }
    }, []);

    useEffect(() => {
        const getMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };
        if (user) getMedia();
    }, [user]);

    useEffect(() => {
        if (!socket || !user || !localStream) return;
        socket.connect();
        const handleParticipantsUpdate = (p) => setParticipants(p);
        socket.on('room:participants', handleParticipantsUpdate);
        return () => {
            socket.disconnect();
            socket.off('room:participants', handleParticipantsUpdate);
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [socket, user, localStream]);

    const toggleCamera = () => {
        toggleMediaTrack('video', !isCameraOn);
        setIsCameraOn(!isCameraOn);
    };

    const toggleMicrophone = () => {
        toggleMediaTrack('audio', !isMicOn);
        setIsMicOn(!isMicOn);
    };

    const handleTogglePanel = (view) => {
        if (isPanelOpen && panelView === view) {
            setIsPanelOpen(false);
        } else {
            setPanelView(view);
            setIsPanelOpen(true);
        }
    };

    if (!user || !localStream) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <Spinner />
                <p className="mt-4 text-lg">Initializing your workspace...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-800 text-white">
            {/* Permanent Header */}
            <RoomHeader roomId={roomId} />

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Whiteboard container */}
                <main className="flex-1 h-full relative">
                    <TldrawCanvas roomId={roomId} />
                </main>

                {/* Side Panel for participants/chat */}
                <SidePanel
                    isOpen={isPanelOpen}
                    view={panelView}
                    setView={setPanelView}
                    onClose={() => setIsPanelOpen(false)}
                    user={user}
                    localStream={localStream}
                    peers={peers}
                    participants={participants}
                    roomId={roomId}
                />
            </div>

            {/* Permanent Footer with Controls */}
            <RoomFooter
                isCameraOn={isCameraOn}
                isMicOn={isMicOn}
                panelView={panelView}
                isPanelOpen={isPanelOpen}
                toggleCamera={toggleCamera}
                toggleMicrophone={toggleMicrophone}
                togglePanel={handleTogglePanel}
                onLeave={() => navigate('/dashboard')}
            />
        </div>
    );
};

export default RoomPage;
import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ stream, isMuted, isLocal, username }) => {
    const videoRef = useRef(null);
    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
    }, [stream]);

    return (
        <div className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video shadow-md">
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted={isMuted} 
                className={`w-full h-full object-cover ${isLocal ? 'transform -scale-x-100' : ''}`} 
            />
            <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-sm font-medium truncate">{username}</p>
            </div>
        </div>
    );
};

const VideoGrid = ({ user, localStream, peers, participants }) => {
    // Combine local user with remote participants for a single list
    const allStreams = [
        { id: user.id, username: `${user.username} (You)`, stream: localStream, isLocal: true },
        ...participants
            .filter(p => p.id !== user.id)
            .map(p => {
                const peer = peers[p.id];
                return { id: p.id, username: p.username, stream: peer ? peer.stream : null, isLocal: false };
            })
    ];

    return (
        <div className="flex flex-col space-y-4 p-4">
            {allStreams.map(p => (
                <div key={p.id}>
                    {p.stream ? (
                        <VideoPlayer 
                            stream={p.stream} 
                            isMuted={p.isLocal} 
                            isLocal={p.isLocal}
                            username={p.username}
                        />
                    ) : (
                        <div className="aspect-video bg-gray-700 rounded-lg flex flex-col items-center justify-center text-center p-2">
                            <p className="text-sm font-medium">{p.username}</p>
                            <p className="text-xs text-gray-400 mt-1">Connecting...</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default VideoGrid;
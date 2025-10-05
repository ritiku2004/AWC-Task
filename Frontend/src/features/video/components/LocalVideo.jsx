import React from 'react';
import { MicOff, VideoOff, User } from 'lucide-react';

const LocalVideo = ({ videoRef, username, isAudioMuted, isVideoOff }) => {
    return (
        <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg aspect-video flex items-center justify-center">
            {/* Show a placeholder icon if the video is off */}
            {isVideoOff && (
                <div className="flex flex-col items-center justify-center text-gray-400">
                    <User size={64} />
                    <p className="mt-2 font-semibold">Camera is off</p>
                </div>
            )}
            <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                // Hide the video element if video is off to show the placeholder
                className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : 'block'}`} 
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm">
                {username} (You)
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
                {isAudioMuted && (
                     <div className="p-2 bg-black bg-opacity-50 rounded-full">
                        <MicOff size={20} className="text-white" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocalVideo;
import React, { useState } from 'react';

// Re-usable Icon components
const Icon = ({ children, className = '' }) => <div className={`w-6 h-6 ${className}`}>{children}</div>;
const MicOnIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const MicOffIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.08V5c0-1.66-1.34-3-3-3S5 3.34 5 5v.08L11 5.08zM6 15c0 .55.45 1 1 1h2m-1-4v4m1-4v4m3-4v4m-1-4v4m0 0h2c.55 0 1-.45 1-1m-4-12a5 5 0 014.58 4.92M15 12a5 5 0 01-5 5M1 1l22 22" /></svg>;
const CamOnIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55-3.27A1 1 0 0121 7.54v9.92a1 1 0 01-1.45.83L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CamOffIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55-3.27A1 1 0 0121 7.54v9.92a1 1 0 01-1.45.83L15 14m-4 5h-4a2 2 0 01-2-2V8a2 2 0 012-2h4m3 0l-1-1m-4 1h.01M1 1l22 22" /></svg>;
const ChatIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const PeopleIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const ShareIcon = () => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>;


const ControlButton = ({ onClick, title, children, isActive = false, isDanger = false }) => {
    const baseClasses = 'p-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800';
    const activeClass = isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600';
    const dangerClass = 'bg-red-600 hover:bg-red-700';
    return (
        <button onClick={onClick} title={title} className={`${baseClasses} ${isDanger ? dangerClass : activeClass}`}>
            {children}
        </button>
    );
};

const RoomControls = ({ roomId, isCameraOn, isMicOn, panelView, isPanelOpen, toggleCamera, toggleMicrophone, togglePanel, onLeave }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(roomId).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed!');
        });
    };

    return (
        <>
            {/* Top-left Info Bar */}
            <div className="absolute top-4 left-4 z-20 bg-gray-900 bg-opacity-70 p-2 rounded-lg flex items-center space-x-2 shadow-lg">
                <button onClick={handleCopy} className="p-2 rounded-md hover:bg-gray-700" title="Copy Room ID">
                    <Icon><ShareIcon/></Icon>
                </button>
                 <div className="pr-2">
                    <p className="text-xs text-gray-400">ROOM ID</p>
                    <p className="font-mono text-sm">{roomId.substring(0, 12)}...</p>
                 </div>
                 {copySuccess && <span className="text-xs text-blue-400">{copySuccess}</span>}
            </div>

            {/* Bottom-center Control Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                <div className="flex items-center space-x-2 md:space-x-3 bg-gray-900 bg-opacity-80 backdrop-blur-sm p-2 rounded-full shadow-2xl">
                    <ControlButton onClick={toggleMicrophone} title={isMicOn ? 'Mute' : 'Unmute'} isDanger={!isMicOn}>
                        <Icon>{isMicOn ? <MicOnIcon /> : <MicOffIcon />}</Icon>
                    </ControlButton>
                    <ControlButton onClick={toggleCamera} title={isCameraOn ? 'Stop Camera' : 'Start Camera'} isDanger={!isCameraOn}>
                        <Icon>{isCameraOn ? <CamOnIcon /> : <CamOffIcon />}</Icon>
                    </ControlButton>

                    <div className="h-6 w-px bg-gray-600 mx-1"></div>

                    <ControlButton onClick={() => togglePanel('chat')} title="Chat" isActive={isPanelOpen && panelView === 'chat'}>
                        <Icon><ChatIcon /></Icon>
                    </ControlButton>
                    <ControlButton onClick={() => togglePanel('participants')} title="Participants" isActive={isPanelOpen && panelView === 'participants'}>
                        <Icon><PeopleIcon /></Icon>
                    </ControlButton>

                    <div className="h-6 w-px bg-gray-600 mx-1"></div>
                    
                    <button onClick={onLeave} className="px-4 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors duration-200 text-sm">
                        Leave
                    </button>
                </div>
            </div>
        </>
    );
};

export default RoomControls;
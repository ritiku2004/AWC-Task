import React, { useState } from 'react';

// Icons
const MicOnIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const MicOffIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.08V5c0-1.66-1.34-3-3-3S5 3.34 5 5v.08L11 5.08zM6 15c0 .55.45 1 1 1h2m-1-4v4m1-4v4m3-4v4m-1-4v4m0 0h2c.55 0 1-.45 1-1m-4-12a5 5 0 014.58 4.92M15 12a5 5 0 01-5 5M1 1l22 22" /></svg>;
const CamOnIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55-3.27A1 1 0 0121 7.54v9.92a1 1 0 01-1.45.83L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const CamOffIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.55-3.27A1 1 0 0121 7.54v9.92a1 1 0 01-1.45.83L15 14m-4 5h-4a2 2 0 01-2-2V8a2 2 0 012-2h4m3 0l-1-1m-4 1h.01M1 1l22 22" /></svg>;
const ChatIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const PeopleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const ShareIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>;

const RoomHeader = ({ roomId, isCameraOn, isMicOn, sidebarView, toggleCamera, toggleMicrophone, toggleSidebar, onLeave }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleShare = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed');
    });
  };

  return (
    <header className="flex-shrink-0 flex justify-between items-center p-2 bg-gray-900 shadow-lg z-30">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">Room: <span className="font-mono text-gray-400 hidden sm:inline">{roomId}</span><span className="font-mono text-gray-400 sm:hidden">{roomId.substring(0, 8)}...</span></h1>
        <button onClick={handleShare} className="ml-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600" title="Copy Room ID">
          <ShareIcon />
        </button>
        {copySuccess && <span className="ml-2 text-sm text-green-400">{copySuccess}</span>}
      </div>
      <div className="flex items-center space-x-1 md:space-x-2">
        <button onClick={toggleMicrophone} className={`p-3 rounded-full ${isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600'}`} title={isMicOn ? 'Mute' : 'Unmute'}>
          <MicOnIcon/>
        </button>
        <button onClick={toggleCamera} className={`p-3 rounded-full ${isCameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600'}`} title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}>
          <CamOnIcon/>
        </button>
        <div className="h-8 w-px bg-gray-600"></div>
        <button onClick={() => toggleSidebar('chat')} className={`p-3 rounded-full ${sidebarView === 'chat' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`} title="Toggle Chat">
          <ChatIcon/>
        </button>
        <button onClick={() => toggleSidebar('participants')} className={`p-3 rounded-full ${sidebarView === 'participants' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`} title="Toggle Participants">
          <PeopleIcon/>
        </button>
        <div className="h-8 w-px bg-gray-600"></div>
        <button onClick={onLeave} className="px-4 py-2 bg-red-600 rounded-full font-semibold hover:bg-red-700 text-sm">
          Leave
        </button>
      </div>
    </header>
  );
};

export default RoomHeader;
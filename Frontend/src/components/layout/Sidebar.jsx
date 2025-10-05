import React from 'react';
import VideoGrid from '../../features/video/components/VideoGrid';
import ChatPanel from '../../features/chat/components/ChatPanel';

const Sidebar = ({ isOpen, view, setView, onClose, user, localStream, peers, participants, roomId }) => {
  return (
    // On mobile (hidden md), it's a full-screen overlay. On desktop (md:), it's a fixed-width sidebar.
    <aside 
      className={`
        absolute inset-0 z-20 bg-gray-900
        md:relative md:z-auto md:inset-auto 
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        md:translate-x-0 ${isOpen ? 'md:w-80 lg:w-96' : 'md:w-0'}
      `}
    >
      {isOpen && (
        <>
          <header className="flex-shrink-0 flex justify-between items-center p-2 border-b border-gray-700">
            {/* Tabs */}
            <div className="flex-1 flex">
              <button 
                onClick={() => setView('participants')}
                className={`flex-1 py-2 text-sm font-semibold ${view === 'participants' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
              >
                Participants
              </button>
              <button 
                onClick={() => setView('chat')}
                className={`flex-1 py-2 text-sm font-semibold ${view === 'chat' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
              >
                Chat
              </button>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl md:hidden ml-2">&times;</button>
          </header>

          <div className="flex-1 overflow-y-auto">
            {view === 'participants' && (
              <VideoGrid 
                layout="vertical"
                user={user} 
                localStream={localStream} 
                peers={peers} 
                participants={participants} 
              />
            )}
            {view === 'chat' && <ChatPanel roomId={roomId} />}
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
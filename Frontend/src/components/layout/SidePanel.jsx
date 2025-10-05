import React from 'react';
import VideoGrid from '../../features/video/components/VideoGrid';
import ChatPanel from '../../features/chat/components/ChatPanel';

const SidePanel = ({ isOpen, view, setView, onClose, user, localStream, peers, participants, roomId }) => {
    return (
        <aside 
            className={`
                bg-gray-900 flex-shrink-0
                transition-all duration-300 ease-in-out
                flex flex-col
                w-full md:w-80 lg:w-96
                ${isOpen ? 'block' : 'hidden'}
            `}
        >
            <header className="flex-shrink-0 flex items-center p-2 border-b border-gray-700">
                <div className="flex-1 flex justify-center">
                    <TabButton name="Participants" currentView={view} setView={setView} count={participants.length + 1} />
                    <TabButton name="Chat" currentView={view} setView={setView} />
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl font-light md:hidden">&times;</button>
            </header>

            <div className="flex-1 overflow-y-auto">
                {view === 'participants' && (
                    <VideoGrid 
                        user={user} 
                        localStream={localStream} 
                        peers={peers} 
                        participants={participants} 
                    />
                )}
                {view === 'chat' && <ChatPanel roomId={roomId} />}
            </div>
        </aside>
    );
};

const TabButton = ({ name, currentView, setView, count }) => {
    const viewName = name.toLowerCase();
    const isActive = currentView === viewName;
    return (
        <button 
            onClick={() => setView(viewName)}
            className={`relative w-1/2 py-2 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
            {name} {count !== undefined && `(${count})`}
            {isActive && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>}
        </button>
    );
};

export default SidePanel;
import React from 'react';
import VideoGrid from './VideoGrid';

const ChevronLeft = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ChevronRight = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;


const VideoSlider = ({ user, localStream, peers, isOpen, onToggle }) => {
  return (
    <div 
      className={`absolute top-0 right-0 h-full bg-gray-900 bg-opacity-80 backdrop-blur-sm transition-all duration-300 ease-in-out ${isOpen ? 'w-64 md:w-72' : 'w-0'}`}
    >
      <div className={`h-full flex flex-col transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Toggle Button */}
        <button 
          onClick={onToggle}
          className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 bg-gray-700 hover:bg-blue-600 p-2 rounded-full shadow-lg"
          title={isOpen ? 'Hide Participants' : 'Show Participants'}
        >
          {isOpen ? <ChevronRight /> : <ChevronLeft />}
        </button>
        
        <h2 className="font-bold text-center p-4 border-b border-gray-700 flex-shrink-0">Participants</h2>
        <div className="flex-grow overflow-y-auto">
          <VideoGrid user={user} localStream={localStream} peers={peers} />
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;
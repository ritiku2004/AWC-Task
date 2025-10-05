import React from 'react';

const VideoControls = ({ isCameraOn, toggleCamera }) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-2 bg-gray-800 rounded-md shadow-lg">
      <button
        onClick={toggleCamera}
        className={`px-4 py-2 rounded-md font-semibold text-white transition-colors
          ${isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
      </button>
      {/* A placeholder for a mute button could go here */}
      {/* <button className="p-2 bg-gray-600 rounded">Mute</button> */}
    </div>
  );
};

export default VideoControls;
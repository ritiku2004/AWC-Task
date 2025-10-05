import React, { useState } from 'react';

const ShareIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" /></svg>;

const RoomHeader = ({ roomId }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopySuccess('Copied link!');
            setTimeout(() => setCopySuccess(''), 2000);
        }, () => {
            setCopySuccess('Failed!');
        });
    };

    return (
        <header className="flex-shrink-0 flex items-center justify-between p-2 md:p-3 bg-gray-900 shadow-md z-10">
            <h1 className="text-lg font-bold">
                <span className="hidden sm:inline">Workspace: </span>
                <span className="font-mono text-gray-400">{roomId.substring(0, 12)}...</span>
            </h1>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handleCopy} 
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    <ShareIcon />
                    <span className="hidden md:inline">Share</span>
                </button>
                {copySuccess && <span className="text-sm text-blue-400 hidden md:inline">{copySuccess}</span>}
            </div>
        </header>
    );
};

export default RoomHeader;
import React from 'react';

const ParticipantList = ({ participants, onClose }) => {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl">Participants ({participants.length})</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
      </div>
      <ul className="flex-1 overflow-y-auto space-y-2">
        {participants.map(p => (
          <li key={p.id} className="p-2 bg-gray-800 rounded">
            {p.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
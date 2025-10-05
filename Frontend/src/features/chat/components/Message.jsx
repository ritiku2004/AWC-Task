import React from 'react';

const Message = ({ message, isOwnMessage }) => {
  const { user, text, timestamp } = message;
  
  const alignment = isOwnMessage ? 'items-end' : 'items-start';
  const bubbleColor = isOwnMessage ? 'bg-blue-600' : 'bg-gray-600';
  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex flex-col ${alignment}`}>
      <div className="flex items-end space-x-2">
        <div className={`px-4 py-2 rounded-lg max-w-xs ${bubbleColor}`}>
          {!isOwnMessage && (
            <p className="text-sm font-bold text-blue-300">{user.username}</p>
          )}
          <p className="text-md break-words">{text}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 mt-1">{time}</span>
    </div>
  );
};

export default Message;
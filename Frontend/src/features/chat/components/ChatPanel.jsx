import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../../context/SocketProvider';
import { useSelector } from 'react-redux';
import { getChatHistory } from '../services/chatApi';
import Message from './Message';

const ChatPanel = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useSelector((state) => state.auth);
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (!roomId) return;
    getChatHistory(roomId)
      .then(history => setMessages(history))
      .catch(err => console.error("Failed to fetch chat history:", err));
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message) => setMessages((prev) => [...prev, message]);
    socket.on('chat:message', handleNewMessage);
    return () => socket.off('chat:message', handleNewMessage);
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      const messageData = { user: { id: user.id, username: user.username }, text: newMessage, timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, messageData]);
      socket.emit('chat:send_message', { roomId, message: newMessage, user });
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} isOwnMessage={msg.user.id === user.id} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-gray-700 rounded-md border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
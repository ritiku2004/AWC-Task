import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoom as createRoomApi } from '../../features/room/services/roomApi';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [joinRoomId, setJoinRoomId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateRoom = async () => {
    setLoading(true);
    setError(null);
    try {
      const roomName = `${user.username}'s Room`;
      const response = await createRoomApi({ name: roomName });
      navigate(`/room/${response.data.roomId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (joinRoomId.trim()) {
      navigate(`/room/${joinRoomId.trim()}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome, {user?.username}!</h1>
          <p className="mt-2 text-gray-400">Create a new room or join an existing one.</p>
        </div>
        {error && <p className="text-red-500 text-center bg-red-100 p-3 rounded">{error}</p>}
        <div>
          <Button onClick={handleCreateRoom} disabled={loading} className="flex items-center justify-center">
            {loading ? <Spinner /> : 'Create New Room'}
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-gray-800 text-sm text-gray-400">OR</span>
          </div>
        </div>
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <input
            type="text"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            placeholder="Enter Room ID to Join"
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Button type="submit">Join Room</Button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authApi';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ username, password });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password (min. 6 characters)"
          />
        </div>
      </div>
      <div>
        <Button type="submit" disabled={loading} className="flex justify-center items-center">
          {loading ? <Spinner /> : 'Create account'}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
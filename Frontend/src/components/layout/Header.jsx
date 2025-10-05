import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../store/slices/authSlice';
import { logout as logoutApi } from '../../features/auth/services/authApi';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi(); // Call the API to clear the cookie
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      dispatch(logoutAction()); // Clear the Redux state
      navigate('/login');
    }
  };
  
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          CollabPlatform
        </Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="hidden sm:block">Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="px-4 py-2 rounded-md hover:bg-gray-700">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
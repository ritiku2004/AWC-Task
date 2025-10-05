import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
            create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
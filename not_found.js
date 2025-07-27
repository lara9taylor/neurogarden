// views/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! We couldn’t find that page.</p>
      <Link to="/" className="text-indigo-600 hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;

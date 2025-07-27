// views/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 px-6">
      <h1 className="text-4xl font-bold mb-4 text-center text-indigo-800">Welcome to NeuroGarden 🌱</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        A calm, colorful dashboard to help you reflect, reset, and grow. Track your moods, store your thoughts, and build your own clarity garden.
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow">
          Log In
        </Link>
        <Link to="/signup" className="bg-white border border-indigo-600 text-indigo-700 px-6 py-2 rounded shadow hover:bg-indigo-50">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;

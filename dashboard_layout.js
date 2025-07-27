// components/DashboardLayout.jsx
import React from 'react';
import useAutosaveAndTimeout from '../hooks/useAutosaveAndTimeout';

const DashboardLayout = ({ children }) => {
  const dummy = 'activity-anchor';
  useAutosaveAndTimeout(dummy, () => {}, 900000); // activity timeout only

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-purple-700 text-white p-4 shadow">
        <h1 className="text-xl font-bold">🌱 NeuroGarden Dashboard</h1>
      </header>
      <main className="p-4 space-y-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;

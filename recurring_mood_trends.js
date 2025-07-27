// views/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import RecurringMoodTrends from '../components/RecurringMoodTrends';
import { fetchMoodEntries } from '../services/api';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchMoodEntries().then(setEntries);
  }, []);

  return (
    <div className="space-y-4">
      <RecurringMoodTrends moodEntries={entries} />
      {/* other dashboard content here */}
    </div>
  );
};

export default Dashboard;

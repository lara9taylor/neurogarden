// views/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import RecurringMoodTrends from '../components/RecurringMoodTrends';
import PredictiveTaskSuggester from '../components/PredictiveTaskSuggester';
import AutobundleGenerator from '../components/AutobundleGenerator';
import MoodAnalyticsPanel from '../components/MoodAnalyticsPanel';
import { fetchMoodEntries } from '../services/api';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchMoodEntries().then(setEntries);
  }, []);

  return (
    <div className="space-y-4">
      <RecurringMoodTrends moodEntries={entries} />
      <PredictiveTaskSuggester entries={entries} />
      <AutobundleGenerator entries={entries} />
      <MoodAnalyticsPanel entries={entries} />
      {/* other dashboard content here */}
    </div>
  );
};

export default Dashboard;

// views/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import RecurringMoodTrends from '../components/RecurringMoodTrends';
import PredictiveTaskSuggester from '../components/PredictiveTaskSuggester';
import AutobundleGenerator from '../components/AutobundleGenerator';
import MoodAnalyticsPanel from '../components/MoodAnalyticsPanel';
import JournalingTrendsPanel from '../components/JournalingTrendsPanel';
import ExportToolsPanel from '../components/ExportToolsPanel';
import EmailExportModal from '../components/EmailExportModal';
import SmartThemePatternPanel from '../components/SmartThemePatternPanel';
import { fetchMoodEntries } from '../services/api';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    fetchMoodEntries().then(setEntries);
  }, []);

  return (
    <div className="space-y-4">
      <RecurringMoodTrends moodEntries={entries} />
      <PredictiveTaskSuggester entries={entries} />
      <AutobundleGenerator entries={entries} />
      <MoodAnalyticsPanel entries={entries} />
      <JournalingTrendsPanel entries={entries} />
      <ExportToolsPanel entries={entries} onEmailClick={() => setShowEmailModal(true)} />
      <SmartThemePatternPanel entries={entries} />
      {showEmailModal && <EmailExportModal entries={entries} onClose={() => setShowEmailModal(false)} />}
    </div>
  );
};

export default Dashboard;

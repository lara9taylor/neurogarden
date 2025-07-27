// utils/moodPatternEngine.js

export const detectRecurringMoodTimes = (entries) => {
  const moodTimeMap = {};

  entries.forEach(({ mood, timestamp }) => {
    const hour = new Date(timestamp).getHours();
    const key = `${mood}-${hour}`;
    moodTimeMap[key] = (moodTimeMap[key] || 0) + 1;
  });

  const alerts = [];
  Object.entries(moodTimeMap).forEach(([key, count]) => {
    if (count >= 3) {
      const [mood, hour] = key.split('-');
      alerts.push(`⚠️ You've felt ${mood} around ${hour}:00 on ${count} different days.`);
    }
  });

  return alerts;
};

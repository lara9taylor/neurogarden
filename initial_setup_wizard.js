// views/InitialSetupWizard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InitialSetupWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [moodStyle, setMoodStyle] = useState('emoji');
  const [theme, setTheme] = useState('light');

  const steps = [
    {
      title: 'Welcome! 🌱',
      content: (
        <div>
          <p className="mb-2">Let's personalize your NeuroGarden space.</p>
          <input
            placeholder="What should we call you?"
            className="p-2 w-full rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )
    },
    {
      title: 'Pick a Mood Style 🎭',
      content: (
        <div className="space-y-2">
          <label><input type="radio" name="mood" value="emoji" checked={moodStyle === 'emoji'} onChange={() => setMoodStyle('emoji')} /> Emoji-based 🌈</label>
          <label><input type="radio" name="mood" value="words" checked={moodStyle === 'words'} onChange={() => setMoodStyle('words')} /> Words-only 📖</label>
        </div>
      )
    },
    {
      title: 'Choose a Theme 🎨',
      content: (
        <div className="space-y-2">
          <label><input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={() => setTheme('light')} /> Light 🌞</label>
          <label><input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} /> Dark 🌙</label>
        </div>
      )
    },
    {
      title: 'All Set! 🎉',
      content: (
        <div>
          <p className="mb-4">We’ll remember your settings. Click below to go to your dashboard.</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded shadow"
            onClick={() => navigate('/dashboard')}
          >
            Enter NeuroGarden
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{steps[step].title}</h2>
      {steps[step].content}
      {step < steps.length - 1 && (
        <button
          onClick={() => setStep(step + 1)}
          className="mt-4 bg-purple-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default InitialSetupWizard;

// views/AccountSettings.jsx
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const AccountSettings = () => {
  const { supabase, user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    if (email !== confirmEmail) {
      setMessage('Emails do not match.');
      return;
    }
    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    const updates = {};
    if (email !== user.email) updates.email = email;
    if (password) updates.password = password;
    if (Object.keys(updates).length === 0) return;
    const { error } = await supabase.auth.updateUser(updates);
    setMessage(error ? error.message : 'Updated successfully!');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <input
        className="w-full p-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="New Email"
      />
      <input
        className="w-full p-2 mb-4 border rounded"
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
        type="email"
        placeholder="Confirm Email"
      />
      <input
        className="w-full p-2 mb-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        className="w-full p-2 mb-4 border rounded"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        placeholder="Confirm Password"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default AccountSettings;

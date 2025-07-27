// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import Login from './views/Login';
import Signup from './views/Signup';
import ResetPassword from './views/ResetPassword';
import Dashboard from './views/Dashboard';
import AccountSettings from './views/AccountSettings';
import InitialSetupWizard from './views/InitialSetupWizard';
import Home from './views/Home';
import NotFound from './views/NotFound';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const { user } = useAuth();

  return (
    <GlobalErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/reset" element={<ResetPassword />} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute><AccountSettings /></PrivateRoute>} />
          <Route path="/setup" element={<PrivateRoute><InitialSetupWizard /></PrivateRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </GlobalErrorBoundary>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout'; // Import Layout
import Home from './Pages/Home';
import InRepair from './Pages/InRepair';
import CompletedDevices from './Pages/CompletedDevices';
import ReceivedDevices from './Pages/ReceivedDevices';
import RemovedDevices from './Pages/RemovedDevices';
import AddDevice from './Pages/AddDevice';
import AllDevices from './Pages/AllDevices';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import WelcomePage from './Pages/WelcomePage';

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Direct check to avoid race conditions with React state updates
  const token = localStorage.getItem('token');

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  // If we have a user in state OR a token in storage, let them through.
  if (user || token) {
    return <Layout>{children}</Layout>;
  }

  return <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem('token');

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  // If logged in (state or storage), go to dashboard
  if (user || token) {
    return <Navigate to="/Home" replace />;
  }

  return children;
}

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/welcome" element={<PublicRoute><WelcomePage /></PublicRoute>} />

      {/* Protected Routes */}
      <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/AllDevices" element={<ProtectedRoute><AllDevices /></ProtectedRoute>} />
      <Route path="/InRepair" element={<ProtectedRoute><InRepair /></ProtectedRoute>} />
      <Route path="/CompletedDevices" element={<ProtectedRoute><CompletedDevices /></ProtectedRoute>} />
      <Route path="/ReceivedDevices" element={<ProtectedRoute><ReceivedDevices /></ProtectedRoute>} />
      <Route path="/RemovedDevices" element={<ProtectedRoute><RemovedDevices /></ProtectedRoute>} />
      <Route path="/AddDevice" element={<ProtectedRoute><AddDevice /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;

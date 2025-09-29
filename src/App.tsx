import React, { useState, useEffect } from 'react';
import SaarthiChatBox from './components/SaarthiChatBox';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import StudentDashboard from './components/dashboards/Student/StudentDashboard';
import RecruiterDashboard from './components/dashboards/RecruiterDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { user, loading } = useAuth();
  console.log('Current user:', user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/student/*"
        element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/auth" replace />}
      />
      <Route
        path="/recruiter/*"
        element={user?.role === 'recruiter' ? <RecruiterDashboard /> : <Navigate to="/auth" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
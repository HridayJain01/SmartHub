import React, { useState, useEffect } from 'react';
import SaarthiChatBox from './components/SaarthiChatBox';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import StudentDashboard from './components/dashboards/Student/StudentDashboard';
import InstitutionDashboard from './components/dashboards/InstitutionDashboard';
import OrganizerDashboard from './components/dashboards/OrganizerDashboard';
import RecruiterDashboard from './components/dashboards/RecruiterDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { supabase } from './lib/supabase';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/student/*" 
          element={
            user && user.role === 'student' ? 
            <StudentDashboard /> : 
            <Navigate to="/auth" replace />
          } 
        />
        <Route 
          path="/institution/*" 
          element={
            user && user.role === 'institution' ? 
            <InstitutionDashboard /> : 
            <Navigate to="/auth" replace />
          } 
        />
        <Route 
          path="/organizer/*" 
          element={
            user && user.role === 'organizer' ? 
            <OrganizerDashboard /> : 
            <Navigate to="/auth" replace />
          } 
        />
        <Route 
          path="/recruiter/*" 
          element={
            user && user.role === 'recruiter' ? 
            <RecruiterDashboard /> : 
            <Navigate to="/auth" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SaarthiChatBox />
    </div>
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
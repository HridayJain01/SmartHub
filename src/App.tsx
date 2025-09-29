import React from 'react';
import SaarthiChatBox from './components/SaarthiChatBox';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import StudentDashboard from './components/dashboards/Student/StudentDashboard';
import InstitutionDashboard from './components/dashboards/Institute/InstitutionDashboard';
import OrganizerDashboard from './components/dashboards/OrganizerDashboard';
import RecruiterDashboard from './components/dashboards/RecruiterDashboard';
import DepartmentDashboard from './components/dashboards/DepartmentDashboard'; 
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

  const deptFlag =
    typeof window !== 'undefined' && sessionStorage.getItem('deptLogin') === 'true';
  const canAccessDept = (user?.role === 'department') || deptFlag;

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/student/*"
          element={user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/institution/*"
          element={user?.role === 'institution' ? <InstitutionDashboard /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/department/*"
          element={canAccessDept ? <DepartmentDashboard /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/organizer/*"
          element={user?.role === 'organizer' ? <OrganizerDashboard /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/recruiter/*"
          element={user?.role === 'recruiter' ? <RecruiterDashboard /> : <Navigate to="/auth" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SaarthiChatBox />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

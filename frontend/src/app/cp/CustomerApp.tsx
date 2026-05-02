import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import OTP from './pages/OTP';
import Dashboard from './pages/Dashboard';
import ServiceHistory from './pages/ServiceHistory';
import HealthCardDetail from './pages/HealthCardDetail';
import Profile from './pages/Profile';
import Security from './pages/Security';
import FamilyManagement from './pages/FamilyManagement';
import Support from './pages/Support';
import Feedback from './pages/Feedback';
import Notifications from './pages/Notifications';

export default function CustomerApp() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Customer Portal";
  }, [pathname]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="otp" element={<OTP />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="history" element={<ServiceHistory />} />
      <Route path="card-detail" element={<HealthCardDetail />} />
      <Route path="profile" element={<Profile />} />
      <Route path="security" element={<Security />} />
      <Route path="family" element={<FamilyManagement />} />
      <Route path="support" element={<Support />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="notifications" element={<Notifications />} />
      
      {/* Catch-all routes for the demo */}
      <Route path="records" element={<ServiceHistory />} />
      
      <Route path="" element={<Navigate to="login" replace />} />
    </Routes>
  );
}

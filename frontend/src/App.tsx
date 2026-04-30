import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/executive/Layout';

// Executive Auth Pages
import Login from '@/app/executive/Login';
import ResetPassword from '@/app/executive/ResetPassword';
import VerifyOTP from '@/app/executive/VerifyOTP';

// Executive Pages
import Dashboard from '@/app/executive/dashboard/Dashboard';
import Schedule from '@/app/executive/dashboard/Schedule';
import RegistrationWizard from '@/app/executive/registration/Wizard';
import RegistrationComplete from '@/app/executive/registration/Complete';
import Leads from '@/app/executive/registration/Leads';
import LogVisit from '@/app/executive/registration/LogVisit';
import RoutesPage from '@/app/executive/registration/Routes';
import CardRegistry from '@/app/executive/cards/Registry';
import FailedDeliveries from '@/app/executive/cards/FailedDeliveries';
import Reports from '@/app/executive/reports/Reports';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Executive Routes */}
        <Route 
          path="/*" 
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/register" element={<RegistrationWizard />} />
                <Route path="/register/complete" element={<RegistrationComplete />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/visits" element={<LogVisit />} />
                <Route path="/routes" element={<RoutesPage />} />
                <Route path="/registry" element={<CardRegistry />} />
                <Route path="/failed-deliveries" element={<FailedDeliveries />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

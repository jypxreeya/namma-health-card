import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ExecutiveLayout from '@/components/executive/Layout';
import FMLayout from '@/components/fm/Layout';

// Auth Pages
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

// Field Manager Pages
import FMDashboard from '@/app/fm/Dashboard';
import TeamManagement from '@/app/fm/TeamManagement';
import RegistrationOversight from '@/app/fm/Oversight';
import TerritoryManagement from '@/app/fm/Territory';
import LeadFunnel from '@/app/fm/LeadFunnel';
import CardDistribution from '@/app/fm/Distribution';
import ReportsAnalytics from '@/app/fm/Reports';
import ComplianceAudit from '@/app/fm/Compliance';
import CommunicationCentre from '@/app/fm/Communication';

// Temporary Mock Page for unimplemented modules (e.g. Settings)
const MockPage = ({ title }: { title: string }) => (
  <div className="p-8 bg-white rounded-[40px] border border-slate-100 min-h-[600px] flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
    <h2 className="text-3xl font-bold text-slate-800 mb-2">{title}</h2>
    <p className="text-slate-400 max-w-md font-medium">This module is currently being optimized for high-performance operational oversight. Stay tuned.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public / Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Field Manager Portal */}
        <Route 
          path="/fm/*" 
          element={
            <FMLayout>
              <Routes>
                <Route path="/" element={<FMDashboard />} />
                <Route path="/team" element={<TeamManagement />} />
                <Route path="/oversight" element={<RegistrationOversight />} />
                <Route path="/territory" element={<TerritoryManagement />} />
                <Route path="/funnel" element={<LeadFunnel />} />
                <Route path="/distribution" element={<CardDistribution />} />
                <Route path="/reports" element={<ReportsAnalytics />} />
                <Route path="/compliance" element={<ComplianceAudit />} />
                <Route path="/communication" element={<CommunicationCentre />} />
                <Route path="/settings" element={<MockPage title="System Settings" />} />
                <Route path="*" element={<Navigate to="/fm" replace />} />
              </Routes>
            </FMLayout>
          } 
        />

        {/* Executive Portal */}
        <Route 
          path="/*" 
          element={
            <ExecutiveLayout>
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
            </ExecutiveLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

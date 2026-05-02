/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/auth/Login';
import Recovery from './views/auth/Recovery';
import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './views/dashboard/Overview';
import PatientSearch from './views/patients/PatientSearch';
import PatientProfile from './views/patients/PatientProfile';
import DepartmentAssignment from './views/checkin/DepartmentAssignment';
import CheckinSuccess from './views/checkin/CheckinSuccess';
import BeneficiarySelection from './views/checkin/BeneficiarySelection';
import ServiceEntry from './views/billing/ServiceEntry';
import UtilizationReports from './views/reports/UtilizationReports';
import Verification from './views/checkin/Verification';
import Admin1Portal from './Admin1Portal';

export default function AdminApp() {
  return (
    <Routes>
      {/* Auth Flow */}
      <Route path="login" element={<Login />} />
      <Route path="recovery" element={<Recovery />} />
      
      {/* Main Portal Sidebars/Dashboards */}
      <Route path="" element={<DashboardLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Overview />} />
        <Route path="patients" element={<PatientSearch />} />
        <Route path="patients/:id" element={<PatientProfile />} />
        <Route path="billing" element={<ServiceEntry />} />
        <Route path="reports" element={<UtilizationReports />} />
        
        {/* Check-in Stepper Flow */}
        <Route path="checkin/verify" element={<Verification />} />
        <Route path="checkin/beneficiary" element={<BeneficiarySelection />} />
        <Route path="checkin/department" element={<DepartmentAssignment />} />
        <Route path="checkin/success" element={<CheckinSuccess />} />
      </Route>

      <Route path="admin1" element={<Admin1Portal />} />

      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
}

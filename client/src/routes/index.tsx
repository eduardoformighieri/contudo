import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoutes } from './Admin';
import { AuthRoutes } from './Auth';
import { ReportSystemRoutes } from './ReportSystem';

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/report-system/*" element={<ReportSystemRoutes />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

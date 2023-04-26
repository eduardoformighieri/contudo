import { Routes, Route, Navigate } from 'react-router-dom';
import { Manage } from './routes/Manage';
import { Overview } from './routes/Overview';
import { Reports } from './routes/Reports';
import { Report } from './routes/Report';

export const AdminRoutes = () => (
  <Routes>
    <Route index element={<Overview />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/manage" element={<Manage />} />
    <Route path="/reports/:reportId" element={<Report />} />
  </Routes>
);

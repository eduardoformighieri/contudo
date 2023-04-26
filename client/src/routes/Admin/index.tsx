import { Routes, Route, Navigate } from 'react-router-dom';
import { Manage } from './routes/Manage';
import { Home } from './routes/Home';
import { Reports } from './routes/Reports';
import { Report } from './routes/Report';

export const AdminRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/manage" element={<Manage />} />
    <Route path="/reports" element={<Reports />} />
    <Route path="/report/:reportId" element={<Report />} />
  </Routes>
);

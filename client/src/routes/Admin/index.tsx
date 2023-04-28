import { Routes, Route, Navigate } from 'react-router-dom';
import { Manage } from './routes/Manage';
import { Overview } from './routes/Overview';
import { Reports } from './routes/Reports';
import { Report } from './routes/Report';
import { ProtectedRoute } from '../../components/ProtectedRoute';

export const AdminRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route index element={<Reports />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/:reportId" element={<Report />} />
    </Route>
  </Routes>
);

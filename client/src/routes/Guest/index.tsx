import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './routes/Home';
import { CreateReport } from './routes/CreateReport';
import { Report } from './routes/Report';

export const AdminRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/report/:reportId" element={<Report />} />
    <Route path="/create-report" element={<CreateReport />} />
  </Routes>
);

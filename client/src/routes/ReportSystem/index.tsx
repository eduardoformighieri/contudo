import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './routes/Home';
import { CreateReport } from './routes/CreateReport';
import { Report } from './routes/Report';
import { ReportSecret } from './routes/ReportSecret';

export const ReportSystemRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/report/:reportId" element={<Report />} />
    <Route path="/create-report" element={<CreateReport />} />
    <Route path="/report-secret/:secretKey" element={<ReportSecret />} />
  </Routes>
);

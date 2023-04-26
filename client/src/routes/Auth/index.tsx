import { Routes, Route, Navigate } from 'react-router-dom';
import { ForgotPassword } from './routes/ForgotPassword';
import { SignIn } from './routes/SignIn';
import { UpdatePassword } from './routes/UpdatePassword';

export const AuthRoutes = () => (
  <Routes>
    <Route index element={<SignIn />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/update-password/:token" element={<UpdatePassword />} />
  </Routes>
);

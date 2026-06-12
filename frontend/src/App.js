import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/candidate/Dashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><LandingPage /></>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
      <Route path="/company/dashboard" element={<><Navbar /><CompanyDashboard /></>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
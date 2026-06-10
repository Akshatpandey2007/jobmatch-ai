import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/candidate/Dashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('company');

  return (
    <div>
      {currentPage === 'landing' && <><Navbar /><LandingPage /></>}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignupPage />}
      {currentPage === 'dashboard' && <><Navbar /><Dashboard /></>}
      {currentPage === 'company' && <><Navbar /><CompanyDashboard /></>}
    </div>
  );
}

export default App;
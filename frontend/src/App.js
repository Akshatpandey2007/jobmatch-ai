import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/candidate/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div>
      {currentPage === 'landing' && <><Navbar /><LandingPage /></>}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignupPage />}
      {currentPage === 'dashboard' && <><Navbar /><Dashboard /></>}
    </div>
  );
}

export default App;
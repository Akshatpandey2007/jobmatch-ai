import { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [currentPage, setCurrentPage] = useState('signup');

  return (
    <div>
      {currentPage === 'landing' && (
        <>
          <Navbar />
          <LandingPage />
        </>
      )}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignupPage />}
    </div>
  );
}

export default App;